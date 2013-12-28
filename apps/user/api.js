/*jslint node: true */
'use strict';

var path = require('path');
var mongoose = require('mongoose');
var configuration = require('../../config/config');
var authentication = require('../authentication/lib');
var viewDir = path.join(configuration.root, '/apps/user/views');
var User = require('./models/user').User;

/**
 * Create user
 */
exports.create = function (req, res, next) {
    var user = new User(req.body);
    console.log( JSON.stringify( req ) );
    user.provider = 'local';
    user.save(function (err) {
        if (err) {
            console.log( err.toString() );
            return res.render(authentication.signupPath, {
                errors: err.errors,
                user: user
            });
        }
        req.logIn(user, function (loginErr) {
            if (loginErr) {
                return next( loginErr );
            }
            return res.redirect('/');
        });
    });
};

/**
 *  Show profile
 */
exports.profile = function (req, res) {
    var user = req.profile;

    res.render(path.join(viewDir, 'profile'), {
        title: user.name,
        user: user
    });
};

/**
 * Send User
 */
exports.me = function (req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('Failed to load User ' + id));
            }
            req.profile = user;
            next();
        });
};
