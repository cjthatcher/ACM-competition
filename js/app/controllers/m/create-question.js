/* global angular */
angular.module('acm').controller('createQuestion',
  function ($scope, $modalInstance) {
    'use strict';

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.create = function (question, answer) {
      $modalInstance.close({
        question: question,
        answer: answer
      });
    };
  }
);
