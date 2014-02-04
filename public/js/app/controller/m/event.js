/* global angular */
angular.module('acm').controller('mEvent',
  function ($scope, $modalInstance, type, event) {
    'use strict';

    $scope.type = type;
    $scope.nEvent = event;

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };

    $scope.close = function (event) {
      $modalInstance.close(event);
    };
  }
);
