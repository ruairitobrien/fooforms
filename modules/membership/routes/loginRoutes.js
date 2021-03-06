"use strict";
var log = require('fooforms-logging').LOG;

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/')
    .put(function (req, res, next) {
        next(new Error('not implemented'));
    })
    .post(function (req, res, next) {
        passport.authenticate('basic', { session: false }, function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                var result = {
                    message: 'We could not find your user name or password'
                };
                return res.status(401).json(result);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).end();
            });
        })
        (req, res, next)
    })
    .delete(function (req, res, next) {
        next(new Error('not implemented'));
    });
module.exports = router;


