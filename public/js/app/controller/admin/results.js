/* global angular */
angular.module('acm').controller('adminResultsCtrl',
  function ($scope, $state, events, alerts) {
    'use strict';

    events.all(function (err, _events) {
      if (err) return alerts.create('danger', err);

      $scope.events = _events;
    });

    $scope.showResults = function (id) {
      $state.transitionTo('admin.results.result', {
        id: id
      });
    };

    $scope.isActive = function (event) {
      return $state.params.id === event.id;
    };
  }
);
