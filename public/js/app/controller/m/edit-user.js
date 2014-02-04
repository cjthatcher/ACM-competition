/* global angular */
angular.module('acm').controller('mEditUser',
  function ($scope, $modalInstance, curUser) {
    'use strict';

    $scope.user = curUser;

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.save = function (user) {
      $modalInstance.close(user);
    };
  }
);
