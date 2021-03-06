/*jslint node: true */
'use strict';

var express = require('express');
var dashboardController = require('../controllers/dashboardController');

var router = express.Router();

router.get('/user/:user', function (req, res, next) {
    dashboardController.getUserDashboard(req, res, next);
});

router.get('/posts', function (req, res, next) {
    dashboardController.getDashboardPosts(req, res, next);
});

module.exports = router;
