/*jslint node: true */
'use strict';
var formLib = require(global.config.modules.FORM);
var apiUtil = require(global.config.modules.APIUTIL);
var formErrors = require('../lib/formErrors');
var log = require(global.config.modules.LOGGING).LOG;


/**
 *
 * @param req
 * @param res
 */
var createPost = function (req, res) {
    try {
        var body = req.body;
        var postDetails = {
            name: body.name,
            description: body.description || '',
            icon: body.icon || '',
            fields: body.fields
        };
        formLib.createPost(postDetails, req.body.form, function (err, post) {
            if (!err && !post) {
                err = formErrors.postNotFoundError;
            }
            if(err) {
                apiUtil.handleError(res, err);
            } else {
                res.status(200);
                res.send(post);

                formLib.doPostEvents('newPost', req.body, function (err) {
                    if (err) {
                        log.error(__filename, ' - ', err);
                    }
                });
            }
        });
    } catch (err) {
        apiUtil.handleError(res, err);
    }
};

/**
 *
 * @param req
 * @param res
 * @param id
 */
var getPostById = function (req, res, id) {
    try {
        formLib.getPostById(id, function (err, post) {
            if (!err && !post) {
                err = formErrors.postNotFoundError;
            }
            if(err) {
                apiUtil.handleError(res, err);
            } else {
                res.status(200);
                res.send(post);
            }
        });
    } catch (err) {
        apiUtil.handleError(res, err);
    }
};

/**
 *
 * @param req
 * @param res
 * @param formId
 */
var getFormPosts = function (req, res, formId) {
    try {
        formLib.getFormPosts(formId, function (err, posts) {
            if (!err && !posts) {
                err = formErrors.postNotFoundError;
            }
            if(err) {
                apiUtil.handleError(res, err);
            } else {
                res.status(200);
                res.send(posts);
            }
        });
    } catch (err) {
        apiUtil.handleError(res, err);
    }
};

/**
 *
 * @param req
 * @param res
 * @param folderId
 */
var getFolderPosts = function (req, res, folderId) {
    try {
        formLib.getFolderPosts(folderId, function (err, posts) {
            if (!err && !posts) {
                err = formErrors.postNotFoundError;
            }
            if(err) {
                apiUtil.handleError(res, err);
            } else {
                res.status(200);
                res.send(posts);
            }
        });
    } catch (err) {
        apiUtil.handleError(res, err);
    }
};

var getUserPosts = function (req, res) {
    try {
        formLib.getUserPosts(req.user.id, function (err, posts) {
            if (!err && !posts) {
                err = formErrors.postNotFoundError;
            }
            if(err) {
                apiUtil.handleError(res, err);
            } else {
                res.status(200);
                res.send(posts);
            }
        });
    } catch (err) {
        apiUtil.handleError(res, err);
    }
};


var updatePost = function (req, res) {
    try {
        formLib.updatePost(req.body, function (err, post) {
            if (!err && !post) {
                err = formErrors.postNotFoundError;
            }
            if(err) {
                apiUtil.handleError(res, err);
            } else {
                res.status(200);
                res.send(post);
                formLib.doPostEvents('statusChange', req.body, function (err) {
                    if (err) {
                        log.error(__filename, ' - ', err);
                    }
                });
            }
        });
    } catch (err) {
        apiUtil.handleError(res, err);
    }
};

var deletePost = function (req, res) {
    try {
        var id = req.body._id;
        formLib.deletePostById(id, function (err) {
            if (err) {
                apiUtil.handleError(res, err);
            } else {
                res.send(200);
            }
        });

    } catch (err) {
        apiUtil.handleError(res, err);
    }
};


module.exports = {
    create: createPost,
    getPostById: getPostById,
    getUserPosts: getUserPosts,
    getFormPosts: getFormPosts,
    update: updatePost,
    delete: deletePost,
    getFolderPosts: getFolderPosts
};




