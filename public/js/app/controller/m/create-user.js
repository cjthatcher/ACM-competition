/* global angular */
angular.module('acm').controller('mCreateUser',
  function ($scope, $modalInstance) {
    'use strict';

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.save = function (user) {
      $modalInstance.close(user);
    };
  }
);
