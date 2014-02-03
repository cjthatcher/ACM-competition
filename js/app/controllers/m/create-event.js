/* global angular */
angular.module('acm').controller('createEvent',
  function ($scope, $modalInstance) {
    'use strict';

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.create = function (event) {
      $modalInstance.close(event);
    };
  }
);
