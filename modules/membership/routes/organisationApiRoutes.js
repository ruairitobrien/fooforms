"use strict";
var express = require('express');
var router = express.Router();
var log = require('fooforms-logging').LOG;
var organisationController = require('../controllers/organisationController');

router.get('', function (req, res, next) {
    organisationController.listByDisplayName(req, res, next);
});

router.get('/:organisation', function (req, res, next) {
    organisationController.findById(req, res, next);
});

router.post('', function (req, res, next) {
    organisationController.create(req, res, next);
});

router.put('/:organisation', function (req, res, next) {
    organisationController.update(req, res, next);
});

router.delete('/:organisation', function (req, res, next) {
    organisationController.remove(req, res, next);
});

module.exports = router;
