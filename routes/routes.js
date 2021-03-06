3/*jslint node: true */
'use strict';

var log = require('fooforms-logging').LOG;
var rootUrls = require('./../config/rootUrls');
var assets = require('./../config/assets');


var admin = require('../modules/admin/index');
var calendar = require('../modules/calendar/index');
var dashboard = require('../modules/dashboard/index');
var file = require('../modules/file/index');
var formBuilder = require('../modules/formBuilder/index');
var form = require('../modules/forms/index');
var formViewer = require('../modules/formViewer/index');
var membership = require('../modules/membership/index');
var site = require('../modules/site/index');
var store = require('../modules/store/index');

/**
 * Main configuration for all routes in application.
 * Any forms that are added should initialize their routes here.
 *
 * @param app - The express object
 * @param passport - Passport object for authenticator
 */
var routes = function (app, passport) {
    var slash = '/';
    var api = '/api';


    /**
     * Embedded forms. Not protected.
     */
    app.use(slash + rootUrls.formViewer, formViewer.embeddedFormRoutes);

    /**
     * Public routes i.e. don't require authentication
     */

    app.use(slash, site.siteViewRoutes);

    // For the dashboard, authentication is handled on the client by not fetching or showing anything until user is checked.
    app.use(slash + rootUrls.dashboard, dashboard.dashboardViewRoutes);


    /**
     * Authentication routes
     */
    app.use(slash + rootUrls.signup, membership.signupRoutes);
    app.use(slash + rootUrls.signup, membership.signupViewRoutes);
    app.use(slash + rootUrls.login, membership.loginRoutes);
    app.use(slash + rootUrls.forgottenPassword, membership.forgottenPasswordViewRoutes);
    app.use(slash + rootUrls.resetPassword, membership.resetPasswordViewRoutes);
    app.use(api + slash + rootUrls.forgottenPassword, membership.forgottenPasswordApiRoutes);
    app.use(api + slash + rootUrls.resetPassword, membership.resetPasswordApiRoutes);
    app.use(api + slash + rootUrls.invite, membership.invitePublicApiRoutes);

    /**
     * Some basic view routes that wont's bother authenticating since they have no data in them
     */
    app.use(slash + rootUrls.login, membership.loginViewRoutes);
    app.use(slash + rootUrls.users, membership.userViewRoutes);
    app.use(slash + rootUrls.organisations, membership.organisationViewRoutes);
    app.use(slash + rootUrls.teams, membership.teamViewRoutes);
    app.use(slash + rootUrls.files, file.fileViewRoutes);
    app.use(slash + rootUrls.invite, membership.inviteViewRoutes);


    // If someone hits a root URL directly (not from dashboard) redirect them to the dashboard
    for (var rootUrl in rootUrls) {
        app.route(slash + rootUrl)
            .get(function (req, res) {
                return res.render(dashboard.mainView, {
                    dev: (process.env.NODE_ENV === 'development'),
                    user: req.user || '',
                    assets: assets
                });
            });
    }

    // TODO: took authentication off the files route for now. Need to fix.
    app.use(api + slash + rootUrls.files, file.filePublicApiRoutes);

    /**
     * Fooforms store
     */
    app.use(slash + rootUrls.store, passport.authenticate('basic', {session: false}), store.storeViewRoutes);
    app.use(api + slash + rootUrls.store, passport.authenticate('basic', {session: false}), store.storeApiRoutes);


    /**
     * API and other routes that are protected
     */
    app.use(api + slash + rootUrls.invite, passport.authenticate('basic', {session: false}), membership.inviteApiRoutes);
    app.use(api + slash + rootUrls.dashboard, passport.authenticate('basic', {session: false}), dashboard.dashboardApiRoutes);
    app.use(api + slash + rootUrls.users, passport.authenticate('basic', {session: false}), membership.userApiRoutes);
    app.use(api + slash + rootUrls.organisations, passport.authenticate('basic', {session: false}), membership.organisationApiRoutes);
    app.use(api + slash + rootUrls.teams, passport.authenticate('basic', {session: false}), membership.teamApiRoutes);
    app.use(api + slash + rootUrls.forms, passport.authenticate('basic', {session: false}), form.formRoutes);
    app.use(api + slash + rootUrls.posts, passport.authenticate('basic', {session: false}), form.postRoutes);
    app.use(api + slash + rootUrls.comments, passport.authenticate('basic', {session: false}), form.commentRoutes);
    app.use(slash + rootUrls.admin, passport.authenticate('basic', {session: false}), admin.adminViewRoutes);
    app.use(slash + rootUrls.calendar, passport.authenticate('basic', {session: false}), calendar.calendarViewRoutes);
    app.use(slash + rootUrls.forms, passport.authenticate('basic', {session: false}), formBuilder.formBuilderViewRoutes);
    app.use(slash + rootUrls.forms, passport.authenticate('basic', {session: false}), form.formViewRoutes);
    app.use(slash + rootUrls.forms, passport.authenticate('basic', {session: false}), formViewer.formViewerViewRoutes);
    app.use(api + slash + rootUrls.files, passport.authenticate('basic', {session: false}), file.fileApiRoutes);


    app.route(slash + rootUrls.notFound)
        .get(function (req, res) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });


    // TODO: repeating code all over the place here. Copy an past working but doing it right not figured out just yet

    app.get('/:username', function (req, res, next) {
        var username = req.params.username;
        passport.authenticate('basic', { session: false}, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render(dashboard.mainView, {
                    dev: (process.env.NODE_ENV === 'development'),
                    user: req.user || '',
                    assets: assets
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send();
            });
        })(req, res, next);
    });


    app.get('/:username/:form', function (req, res, next) {
        var username = req.params.username;
        var form = req.params.form;
        passport.authenticate('basic', { session: false}, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render(dashboard.mainView, {
                    dev: (process.env.NODE_ENV === 'development'),
                    user: req.user || '',
                    assets: assets
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send();
            });
        })(req, res, next);
    });

    app.get('/:username/:form/edit', function (req, res, next) {
        var username = req.params.username;
        var form = req.params.form;
        passport.authenticate('basic', { session: false}, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render(dashboard.mainView, {
                    dev: (process.env.NODE_ENV === 'development'),
                    user: req.user || '',
                    assets: assets
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send();
            });
        })(req, res, next);
    });

    app.get('/:organisation/teams/:team', function (req, res, next) {
        var organisation = req.params.username;
        var team = req.params.team;
        var form = req.params.form;

        passport.authenticate('basic', { session: false}, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render(dashboard.mainView, {
                    dev: (process.env.NODE_ENV === 'development'),
                    user: req.user || '',
                    assets: assets
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send();
            });
        })(req, res, next);
    });

    app.get('/:organisation/teams/:team/:form', function (req, res, next) {
        var organisation = req.params.username;
        var team = req.params.team;
        var form = req.params.form;

        passport.authenticate('basic', { session: false}, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render(dashboard.mainView, {
                    dev: (process.env.NODE_ENV === 'development'),
                    user: req.user || '',
                    assets: assets
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send();
            });
        })(req, res, next);
    });

    app.get('/:organisation/teams/:team/:form/edit', function (req, res, next) {
        var organisation = req.params.username;
        var team = req.params.team;
        var form = req.params.form;

        passport.authenticate('basic', { session: false}, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render(dashboard.mainView, {
                    dev: (process.env.NODE_ENV === 'development'),
                    user: req.user || '',
                    assets: assets
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send();
            });
        })(req, res, next);
    });



    app.use(function (err, req, res, next) {
        if (err.message.indexOf('not found') > -1) {
            //Treat as 404
            return next();
        }

        //Log it
        log.error(__filename, ' - ', err);

        //Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    //Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

};

module.exports = routes;
