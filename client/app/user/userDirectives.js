angular.module('fooforms.user')
    .directive('userPhoto',
    ['$upload', '$log', '_', 'session',
        function ($upload, $log, _, session) {
            'use strict';
            return {
                restrict: 'E',
                link: function (scope) {
                    scope.onFileSelect = function (selectedFile) {
                        scope.uploadFile = selectedFile[0];
                        scope.doFileUpload();
                    };

                    scope.doFileUpload = function () {
                        if (scope.uploadFile && (_.isArray(scope.uploadFile) ? scope.uploadFile.length > 0 : true)) {
                            var filesUrl = '/api/files';
                            scope.upload = $upload.upload({
                                url: filesUrl,
                                method: 'POST',
                                // headers: {'header-key': 'header-value'},
                                // withCredentials: true,
                                data: {file: scope.uploadFile}

                            }).progress(function (evt) {
                                scope.uploadProgress = (parseInt(100.0 * evt.loaded / evt.total));
                            }).success(function (data) {
                                // file is uploaded successfully
                                scope.uploadFile = [];
                                scope.allowUpload = null;
                                if (data.err) {
                                    $log.error(data.err);
                                } else {
                                    scope.userProfile.photo = filesUrl + '/' + data._id;
                                    session.user.photo = scope.userProfile.photo;
                                }

                            }).error(function (err) {
                                $log.error(err);
                            });
                        }
                    }
                },
                replace: true,
                templateUrl: '/partials/profileUploader.html'
            };
        }]).directive('orgPhoto',
    ['$upload', '$log', '_', 'session',
        function ($upload, $log, _, session) {
            'use strict';
            return {
                restrict: 'E',

                link: function (scope) {
                    scope.onFileSelect = function (selectedFile) {
                        scope.uploadFile = selectedFile[0];
                        scope.doFileUpload();
                    };

                    scope.doFileUpload = function () {
                        if (scope.uploadFile && (_.isArray(scope.uploadFile) ? scope.uploadFile.length > 0 : true)) {
                            var filesUrl = '/api/files';
                            scope.upload = $upload.upload({
                                url: filesUrl,
                                method: 'POST',
                                data: {file: scope.uploadFile}

                            }).progress(function (evt) {
                                scope.uploadProgress = (parseInt(100.0 * evt.loaded / evt.total));
                            }).success(function (data) {
                                // file is uploaded successfully
                                scope.uploadFile = [];
                                scope.allowUpload = null;
                                if (data.err) {
                                    $log.error(data.err);
                                } else {
                                    scope.org.photo = filesUrl + '/' + data._id;
                                    session.org.photo = scope.org.photo;
                                }

                            }).error(function (err) {
                                $log.error(err);
                            });
                        }
                    }
                },
                replace: true,
                templateUrl: '/partials/orgProfileUploader.html'
            };
        }]);

