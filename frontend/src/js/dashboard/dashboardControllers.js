/* global angular */

angular.module('dashboard').controller('DashboardCtrl', ['$scope', '$location', '$http' , '$modal', 'Restangular', 'FormService', 'Forms', 'FolderService', 'Folders', 'PostService', 'Posts', '_', function ($scope, $location, $http, $modal, Restangular, FormService, Forms, FolderService, Folders, PostService, Posts, _) {
    'use strict';
    // the main object to store the form data
    $scope.form = Forms.getCurrentForm();
    $scope.posts = [];
    $scope.selectedView = "/partials/dashboardFeed";

    $scope.gridData = [];
    $scope.gridOptions = { data: 'gridData' };


    var posts2Grid = function () {
        angular.forEach($scope.posts, function (postEntry) {
            var map = _.pick(postEntry, 'menuLabel', 'fields');
            var tempPosts = [];
            angular.forEach(map.fields, function (field) {

                var reduce = _.pick(field, 'label', 'value');
                tempPosts.push(reduce);
            });
            $scope.gridData.push(tempPosts);

        });
    };

    $scope.updateForm = function (form) {
        Forms.setCurrentForm(form);
        Posts.activePost = null;
    };

    $scope.setView = function (view) {

        switch (view) {
            case "feed" :
                $scope.selectedView = "/partials/dashboardFeed";
                break;
            case "grid" :
                $scope.selectedView = "/partials/dashboardGrid";
                break;
            case "card" :
                $scope.selectedView = "/partials/dashboardCard";
                break;
        }
    };

    $scope.viewPost = function (post) {
        var form = Forms.findById(post.form);
        $scope.posts.activePost = post;
        //Forms.setCurrentForm(form);

        //$scope.postObj = $scope.posts[postIndex];
        $scope.showPostForm = true;
        //$scope.setMessage('');

       // $location.path($scope.user.displayName + '/MyPrivateFolder/' + form.name);
    };

    FolderService.getFolders(function (err) {
        if (!err) {
            $scope.privateFolders = Folders.privateFolders;
            $scope.publicFolders = Folders.publicFolders;
        }
    });
    PostService.getUserPosts(function (err) {
        if (!err) {
            $scope.posts = Posts.posts;
            $scope.activePost = $scope.posts[0];
            posts2Grid();
        }
    });
    FormService.getUserForms(function (err) {
        if (!err) {
            $scope.forms = Forms.forms;
        }
    });

}]);