/* global angular */
angular.module('acm').controller('questionCtrl',
  function ($scope, $window, $state, $stateParams, alerts, events) {
    'use strict';

    var id = $stateParams.id;
    var index = $stateParams.index;

    events.get(id, function (err, event) {
      if (err) return alerts.create('error', err);
      $scope.question = event.questions[index];
    });

    $scope.downloadInput = function () {
      var name = $scope.question.name + '-input.txt';
      var url = '/inp/' + id + '/' + index + '/' + name;
      $window.open(url, '_blank');
    };
  }
);
