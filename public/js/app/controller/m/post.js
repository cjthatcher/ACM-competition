/* global angular */
angular.module('acm').controller('mPost',
  function ($scope, $modalInstance, type, post) {
    'use strict';

    $scope.type = type;
    $scope.nPost = post;

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };

    $scope.close = function (post) {
      $modalInstance.close(post);
    };
  }
);
