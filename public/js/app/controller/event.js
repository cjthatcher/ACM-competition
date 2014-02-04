/* global angular */
angular.module('acm').controller('eventCtrl',
  function ($scope, $state, $stateParams, alerts, events) {
    'use strict';

    events.get($stateParams.id, function (err, event) {
      if (err) return alerts.create('error', err);
      $scope.event = event;
    });

    $scope.openQuestion = function (index) {
      $state.transitionTo('event.question', {
        id: $stateParams.id,
        index: index
      });
    };
  }
);
