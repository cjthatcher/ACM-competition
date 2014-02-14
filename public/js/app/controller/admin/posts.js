/* global angular */
angular.module('acm').controller('adminPostsCtrl',
  function ($scope, $modal, $state, alerts, adminPosts) {
    'use strict';

    adminPosts.all(function (err, data) {
      if (err) return alerts.create('error', err);
      $scope.posts = data;
    });

    $scope.create = function () {
      $modal.open({
        templateUrl: 'tmpl/m/post.html',
        controller: 'mPost',
        resolve: {
          type: identity({ title: 'Creating', btn: 'Create' }),
          post: identity({})
        }
      }).result.then(function (post) {
        alerts.create('info', 'Creating New Post...');
        adminPosts.create(post, function (err, id) {
          if (err) return alerts.create('error', err);
          alerts.create('success', 'Post Successfully Created!');
          post.id = id;
          $scope.posts.push(post);
        });
      });
    };

    $scope.editPost = function (post) {
      $modal.open({
        templateUrl: 'tmpl/m/post.html',
        controller: 'mPost',
        resolve: {
          type: identity({ title: 'Editing', btn: 'Edit' }),
          post: identity(post)
        }
      }).result.then(function (ePost) {
        alerts.create('info', 'Updating Post...');
        adminPosts.update(ePost, function (err) {
          if (err) return alerts.create('error', err);
          alerts.create('success', 'Post Successfully Updated!');
          var i = $scope.posts.indexOf(post);
          $scope.posts[i] = ePost;
        });
      });
    };

    $scope.deletePost = function (post) {
      alerts.create('info', 'Deleting Post...');
      adminPosts.remove(post.id, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Post Deleted!');
        var index = $scope.posts.indexOf(post);
        $scope.posts.splice(index, 1);
      });
    };

    function identity(val) {
      return function () {
        return val;
      };
    }
  }
);
