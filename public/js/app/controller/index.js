/* global angular */
angular.module('acm').controller('indexCtrl',
  function ($scope, $log, adminPosts) {
    'use strict';

    adminPosts.all(function (err, posts) {
      if (err) return $log.error(err);
      $scope.posts = posts;
    });
  }
);
