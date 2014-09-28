/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();
var mockgoose = require('mockgoose');
mockgoose(mongoose);

// Keep the logger happy TODO: Make this better when I don't have so much stuff to do
global.config = {};
global.config.root = '../../../';

var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var should = require('should');
var rootUrls = require(global.config.root + '/config/rootUrls');
var signupRoutes = require('../routes/signupRoutes');
var userRoutes = require('../routes/userViewRoutes');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var signupRootUrl = '/' + rootUrls.signup;
var usersRootUrl = '/' + rootUrls.users;

app.use(signupRootUrl, signupRoutes);
app.use(usersRootUrl, userRoutes);

describe('User Routes', function () {

    var displayName = 'name';
    var email = 'user@test.com';
    var otherDisplayName = 'naother';
    var otherEmail = 'otherUser@test.com';
    var password = 'pass';
    var confirmPass = 'pass';
    var organisationName = 'fooforms';
    var otherOrganisationName = 'otherFooforms';

    var user = {};
    var otherUser = {};

    beforeEach(function (done) {
        mockgoose.reset();

        request(app)
            .post(signupRootUrl)
            .send({ email: email, displayName: displayName,
                password: password, confirmPass: confirmPass, organisationName: organisationName })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                user = res.body.user;
                request(app)
                    .post(signupRootUrl)
                    .send({ email: otherEmail, displayName: otherDisplayName,
                        password: password, confirmPass: confirmPass, organisationName: otherOrganisationName })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        otherUser = res.body.user;
                        done(err);
                    });
            });
    });

    describe('GET ' + usersRootUrl, function () {
        it('responds with 200 and json', function (done) {
            request(app)
                .get(usersRootUrl + '/' + user._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('responds with 404 not found', function (done) {
            request(app)
                .get(usersRootUrl + '/' + ObjectId)
                .expect(404, done);
        });
        it('searching by displayName responds with 200 and a list of one user', function (done) {
            request(app)
                .get(usersRootUrl + '?username=' + user.displayName)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.length.should.equal(1);
                    done(err);
                });
        });
        it('searching by displayName responds with 200 and a list of two users', function (done) {
            request(app)
                .get(usersRootUrl + '/?username=' + 'na')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.length.should.equal(2);
                    done(err);
                });
        });
        it('searching by displayName responds with 200 and a list of no users', function (done) {
            request(app)
                .get(usersRootUrl + '/?username=' + 'lalalal')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.length.should.equal(0);
                    done(err);
                });
        });
        it('checking username returns true', function (done) {
            request(app)
                .get(usersRootUrl + '/check/username/' + user.displayName)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.exists.should.equal(true);
                    done(err);
                });
        });
        it('checking org name returns true', function (done) {
            request(app)
                .get(usersRootUrl + '/check/username/' + organisationName)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.exists.should.equal(true);
                    done(err);
                });
        });
        it('checking non existent username returns false', function (done) {
            request(app)
                .get(usersRootUrl + '/check/username/' + 'some name')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.exists.should.equal(false);
                    done(err);
                });
        });
        it('checking non existent org name returns false', function (done) {
            request(app)
                .get(usersRootUrl + '/check/username/' + 'some org name')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.exists.should.equal(false);
                    done(err);
                });
        });
    });

    describe('PUT ' + usersRootUrl, function () {

        it('responds with 200 and updated user', function (done) {
            var newEmail = 'shinyNew@email.com';
            user.email = newEmail;
            request(app)
                .put(usersRootUrl + '/' + user._id)
                .send(user)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200).end(function (err, res) {
                    res.body.user.email.should.equal(newEmail);
                    done(err);
                });
        });
    });

});
