/*jslint node: true */
'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');
var modulesPath = path.join(rootPath, 'modules');

/* Convenience paths to modules and other components */
var adminDir = path.join(modulesPath, 'admin');
var formDir = path.join(modulesPath, 'form');
var authenticationDir = path.join(modulesPath, 'authentication');
var folderDir = path.join(modulesPath, 'folder');
var foldersDir = path.join(modulesPath, 'folders');
var dashboardDir = path.join(modulesPath, 'dashboard');
var userDir = path.join(modulesPath, 'user');
var formBuilderDir = path.join(modulesPath, 'formBuilder');
var formViewerDir = path.join(modulesPath, 'formViewer');
var calendarDir = path.join(modulesPath, 'calendar');
var fileDir = path.join(modulesPath, 'file');
var siteDir = path.join(modulesPath, 'site');

/**
 * Enumerator to allow easy access to absolute module root paths.
 */
var modules = {
    "ADMIN": adminDir,
    "FORM": formDir,
    "AUTHENTICATION": authenticationDir,
    "FOLDER": folderDir,
    "FOLDERS": foldersDir,
    "DASHBOARD": dashboardDir,
    "USER": userDir,
    "FORMBUILDER": formBuilderDir,
    "FORMVIEWER": formViewerDir,
    "CALENDAR": calendarDir,
    "FILE": fileDir,
    "SITE": siteDir
};

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    modules: modules
};

