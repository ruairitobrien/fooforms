/*jslint node: true */
'use strict';

var authenticator = require(global.config.apps.AUTHENTICATION);
var dev = (process.env.NODE_ENV === 'development');

/**
 * Main configuration for all routes in application.
 * Any apps that are added should initialize their routes here.
 * @param app - The express object
 * @param passport - Passport object for authenticator
 */
var routes = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index', {
            title: global.config.app.title,
            dev: dev
        });
    });

    app.get('/:username', function (req, res, next) {
        console.log(req.params.username);
        if (req.params.username === 'hello') {
            res.send('Hello');
        } else {
            next();
        }
    });

    app.get('/:username/:folder', function (req, res, next) {
        var expected = 'hello/sir';
        if (req.params.username + '/' + req.params.folder === expected) {
            res.send('Hello Sir');
        } else {
            next();
        }
    });

    app.get('/:username/:folder/:form', function (req, res, next) {
        var expected = 'hello/sir/evening';
        if (req.params.username + '/' + req.params.folder + '/' + req.params.form === expected) {
            res.send('Hello sir, good evening.');
        } else {
            next();
        }
    });

    require('../modules/admin/routes')(app, passport);
    require('../modules/app/routes')(app, passport);
    require('../modules/authentication/routes')(app, passport);
    require('../modules/cloud/routes')(app, passport);
    require('../modules/dashboard/routes')(app, passport);
    require('../modules/calendar/routes')(app, passport);
    require('../modules/database/routes')(app, passport);
    require('../modules/user/routes')(app, passport);
    require('../modules/appBuilder/routes')(app, passport);
    require('../modules/appViewer/routes')(app, passport);
    require('../modules/file/routes')(app, passport);

    app.get('/partials/userGuide', authenticator.ensureLoggedIn, function (req, res) {
        res.render('userGuide', {
            user: req.user
        });
    });

    app.get('/partials/settings', authenticator.ensureLoggedIn, function (req, res) {
        res.render('settings', {
            user: req.user
        });
    });

    app.get('/404', function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

    app.get('*', authenticator.ensureAuthenticated, function (req, res) {
        res.render('dashboard', {
            dev: dev,
            user: req.user
        });
    });

};

module.exports = routes;
