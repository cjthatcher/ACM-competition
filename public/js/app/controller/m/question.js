/* global angular */
angular.module('acm').controller('mQuestion',
  function ($scope, $modalInstance, type, question) {
    'use strict';

    $scope.type = type;
    $scope.nQuestion = question;

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };

    $scope.close = function (question) {
      $modalInstance.close(question);
    };
  }
);
