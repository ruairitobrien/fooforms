var log = require('fooforms-logging').LOG;
var FooForm = require('fooforms-forms');
var Membership = require('fooforms-membership');
var db = require('mongoose').connection;
var statusCodes = require('fooforms-rest').statusCodes;
var errorHandler = require('fooforms-rest').errorResponseHandler;
var fooForm = new FooForm(db);
var membership = new Membership(db);

// TODO: This is just terrible.... but works. Refactor when not in get the thing out the door mode.
var populateForms = function (args, next) {
    var user = args.user;
    var model = '';
    if (args.model) {
        model = args.model + '.';
    }

    membership.User.populate(user, {path: model + 'folders', model: 'Folder'}, function (err, user) {
        if (err) {
            return next(err);
        }
        membership.User.populate(user, {path: model + 'folders.forms', model: 'Form'}, function (err, user) {
            return next(err, user);
            /*membership.User.populate(user, {path: model + 'forms.postStreams', model: 'PostStream'}, function (err, user) {
             if(user.folders[0].forms) {
             console.log(user.folders[0].forms[0].postStreams[0]);
             }
             if (err) {
             return next(err);
             }
             membership.User.populate(user, {path: model + 'forms.postStreams.posts', model: 'Post'}, function (err, user) {
             if (err) {
             return next(err);
             }
             membership.User.populate(user, {path: model + 'forms.postStreams.posts.commentStreams', model: 'CommentStream'}, function (err, user) {
             if (err) {
             return next(err);
             }
             membership.User.populate(user, {path: model + 'forms.postStreams.posts.commentStreams.comments', model: 'Comment'}, function (err, user) {
             return next(err, user);
             });
             });
             });
             });*/
        });
    });
};

exports.getUserDashboard = function (req, res, next) {
    var userId = req.params.user;

    membership.User.findById(userId).lean().populate('organisations teams').exec(function (err, doc) {
        if (err) {
            return next(err);
        }
        if (!doc) {
            res.status(statusCodes.NOT_FOUND);
        }
        populateForms({user: doc}, function (err, user) {
            if (err) {
                return next(err);
            }
            populateForms({user: user, model: 'organisations'}, function (err, user) {
                if (err) {
                    return next(err);
                }
                user.defaultFolder = user.folders[0];
                for (var i = 0; i < user.organisations.length; i++) {
                    user.organisations[i].defaultFolder = user.organisations[i].folders[0];
                }
                res.status(statusCodes.OK).send(user);
            });
        });
    });

};
