/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var should = require('should');
var rootUrls = require('../../../config/rootUrls');
var formRoutes = require('../routes/formRoutes');
var FooForm = require('fooforms-forms');
var db = require('mongoose').connection;
var fooForm = new FooForm(db);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var rootUrl = '/' + rootUrls.forms;
app.use('/forms', formRoutes);

describe('Form API', function () {
    // Some test data
    var displayName = 'form';
    var title = 'form title';
    var icon = 'www.fooforms.com/icon.png';
    var description = 'the form description';
    var btnLabel = 'the button label';
    var formEvents = [
        {}
    ];
    var settings = {"setting": {}, "something": [], "something-else": "test"};
    var fields = [
        {},
        {},
        {}
    ];
    var postStream = ObjectId;
    var folder;
    var sampleForm;

    beforeEach(function (done) {

        sampleForm = {
            displayName: displayName, title: title, icon: icon,
            description: description, btnLabel: btnLabel,
            settings: settings, fields: fields, formEvents: formEvents,
            postStream: postStream
        };

        var testFolder = {displayName: 'aFolder'};

        var folderModel = new fooForm.Folder(testFolder);
        folderModel.save(function (err, savedFolder) {
            should.not.exist(err);
            should.exist(savedFolder);
            folder = savedFolder;
            done(err);
        })
    });

    afterEach(function () {
        mockgoose.reset();
    });

    describe('POST ' + rootUrl, function () {
        afterEach(function () {
            mockgoose.reset();
        });

        it('responds with 201 and json', function (done) {
            sampleForm.folder = folder._id;
            request(app)
                .post(rootUrl)
                .send(sampleForm)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201, function (err, res) {
                    var form = res.body;
                    res.headers.location.should.equal(rootUrl + '/' + form._id);
                    form.displayName.should.equal(displayName);
                    done(err);
                });
        });
    });

    describe('GET ' + rootUrl, function () {
        var form = {};
        var otherForm = {};

        beforeEach(function (done) {
            sampleForm.folder = folder._id;
            request(app)
                .post(rootUrl)
                .send(sampleForm)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    form = res.body;
                    res.headers.location.should.equal(rootUrl + '/' + form._id);
                    sampleForm.displayName = 'other-form';
                    request(app)
                        .post(rootUrl)
                        .send(sampleForm)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(201)
                        .end(function (err, res) {
                            otherForm = res.body;
                            res.headers.location.should.equal(rootUrl + '/' + otherForm._id);
                            done(err);
                        });
                });
        });


        it('responds with 200 and json', function (done) {
            request(app)
                .get(rootUrl + '/' + form._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('checking non existent form name returns false', function (done) {
            request(app)
                .get(rootUrl + '/check/name/' + ObjectId + '/someForm')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.exists.should.equal(false);
                    done(err);
                });
        });
        it('checking an existing form name in folder returns true', function (done) {
            request(app)
                .get(rootUrl + '/check/name/' + form.folder + '/' + form.displayName)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.exists.should.equal(true);
                    done(err);
                });
        });
        it('checking non existent form name in folder returns true', function (done) {
            request(app)
                .get(rootUrl + '/check/name/' + form.folder + '/someName')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.exists.should.equal(false);
                    done(err);
                });
        });
    });

    describe('PUT ' + rootUrl, function () {
        var form = {};
        var resourceUrl;

        beforeEach(function (done) {
            sampleForm.folder = folder._id;
            request(app)
                .post(rootUrl)
                .send(sampleForm)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    form = res.body;
                    res.headers.location.should.equal(rootUrl + '/' + form._id);
                    resourceUrl = res.headers.location;
                    done(err);
                });
        });


        it('responds with 200 and the updated json', function (done) {
            var titleUpdated = 'form title updated';
            var iconUpdated = 'www.fooforms.com/iconUpdated.png';
            var descriptionUpdated = 'the form description updated';
            var btnLabelUpdated = 'the button label updated';
            form.title = titleUpdated;
            form.icon = iconUpdated;
            form.description = descriptionUpdated;
            form.btnLabel = btnLabelUpdated;
            request(app)
                .put(resourceUrl)
                .send(form)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('DELETE ' + rootUrl, function () {
        var form = {};
        var resourceUrl;

        beforeEach(function (done) {
            sampleForm.folder = folder._id;
            request(app)
                .post(rootUrl)
                .send(sampleForm)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    form = res.body;
                    res.headers.location.should.equal(rootUrl + '/' + form._id);
                    resourceUrl = res.headers.location;
                    done(err);
                });
        });

        it('successfully deletes a form', function (done) {
            request(app)
                .delete(resourceUrl)
                .send(form)
                .expect(204, done);
        });

    });

    describe('PATCH ' + rootUrl, function () {
        var form = {};
        var resourceUrl;
        var otherFolder = {};

        beforeEach(function (done) {
            sampleForm.folder = folder._id;
            var otherTestFolder = {displayName: 'anotherFolder'};
            var folderModel = new fooForm.Folder(otherTestFolder);
            folderModel.save(function (err, savedFolder) {
                should.not.exist(err);
                should.exist(savedFolder);
                otherFolder = savedFolder;
                request(app)
                    .post(rootUrl)
                    .send(sampleForm)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end(function (err, res) {
                        form = res.body;
                        res.headers.location.should.equal(rootUrl + '/' + form._id);
                        resourceUrl = res.headers.location;
                        done(err);
                    });
            });
        });

        it('successfully moves a form', function (done) {
            request(app)
                .patch(resourceUrl)
                .send({
                    action: 'moveToFolder',
                    folder: otherFolder._id
                })
                .expect(200, function (err, res) {
                    should.not.exist(err);
                    var updatedForm = res.body;
                    should.exist(updatedForm);
                    updatedForm.folder.should.eql(otherFolder._id.toString());

                    fooForm.Folder.findById(folder._id, function (err, folder) {
                        should.not.exist(err);
                        should.exist(folder);
                        folder.forms.length.should.equal(0);
                        fooForm.Folder.findById(otherFolder._id, function (err, otherFolder) {
                            should.not.exist(err);
                            should.exist(otherFolder);
                            otherFolder.forms.length.should.equal(1);
                            otherFolder.forms[0].toString().should.eql(updatedForm._id);
                            done(err);
                        });
                    });
                });
        });

        it('does not move a form to a folder that does not exist', function (done) {
            request(app)
                .patch(resourceUrl)
                .send({
                    action: 'moveToFolder',
                    folder: ObjectId
                })
                .expect(404, function (err, res) {
                    should.not.exist(err);
                    fooForm.Folder.findById(folder._id, function (err, folder) {
                        should.exist(folder);
                        folder.forms.length.should.equal(1);
                        folder.forms[0].toString().should.eql(form._id);
                        done(err);
                    });
                });
        });

        it('returns 400 for bad request', function (done) {
            request(app)
                .patch(resourceUrl)
                .send({
                    action: 'moveToFolderXXXXX',
                    folder: otherFolder._id
                })
                .expect(400, done);
        });

    });
});

