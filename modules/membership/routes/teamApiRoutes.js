"use strict";
var express = require('express');
var router = express.Router();
var log = require('fooforms-logging').LOG;
var teamController = require('../controllers/teamController');

router.get('/:team', function (req, res, next) {
    teamController.findById(req, res, next);
});

router.get('/:team/members', function (req, res, next) {
    teamController.listMembers(req, res, next);
});

router.get('/:team/members/:name', function (req, res, next) {
    teamController.searchMembers(req, res, next);
});

router.post('', function (req, res, next) {
    teamController.create(req, res, next);
});

router.put('/:team', function (req, res, next) {
    teamController.update(req, res, next);
});

router.delete('', function (req, res, next) {
    teamController.remove(req, res, next);
});

module.exports = router;
