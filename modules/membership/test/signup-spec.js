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
var signupRoutes = require('../routes/signupRoutes');
var rootUrls = require(global.config.root + '/config/rootUrls');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var rootUrl = '/' + rootUrls.signup;

app.use(rootUrl, signupRoutes);

describe('Signup Routes', function () {

    var displayName = 'name';
    var email = 'user@test.com';
    var password = 'pass';
    var confirmPass = 'pass';
    var wrongConfirmPass = 'wrong';
    var organisationName = 'fooforms';


    beforeEach(function () {
        mockgoose.reset();
    });

    describe('POST ' + rootUrl, function () {
        it('responds with 200 and json', function (done) {
            request(app)
                .post(rootUrl)
                .send({ email: email, displayName: displayName,
                    password: password, confirmPass: confirmPass, organisationName: organisationName })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('responds with an error when no email is provided', function (done) {
            request(app)
                .post(rootUrl)
                .send({ email: '', displayName: displayName,
                    password: password, confirmPass: confirmPass, organisationName: organisationName })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
        it('responds with an error when no displayName is provided', function (done) {
            request(app)
                .post(rootUrl)
                .send({ email: email, displayName: '',
                    password: password, confirmPass: confirmPass, organisationName: organisationName })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
        it('responds with an error when no password is provided', function (done) {
            request(app)
                .post(rootUrl)
                .send({ email: email, displayName: displayName })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
        it('responds with an error when passwords do not match', function (done) {
            request(app)
                .post(rootUrl)
                .send({ email: email, displayName: displayName,
                    password: password, confirmPass: wrongConfirmPass, organisationName: organisationName })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
        it('responds with an error when no organisation name provided', function (done) {
            request(app)
                .post(rootUrl)
                .send({ email: email, displayName: displayName,
                    password: password, confirmPass: confirmPass })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });

});

