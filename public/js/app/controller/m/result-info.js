/* global angular */
angular.module('acm').controller('mResultInfo',
  function ($scope, $modalInstance, result) {
    'use strict';

    $scope.collapseSource = true;
    $scope.collapseAnswer = true;

    $scope.result = result;

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };
  }
);
