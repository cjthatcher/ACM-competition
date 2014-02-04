/* global angular */
angular.module('acm').controller('eventsCtrl',
  function ($scope, $state, alerts, events) {
    'use strict';

    events.all(function (err, events) {
      if (err) return alerts.create('error', err);
      $scope.events = events;
    });

    $scope.goToEvent = function (id) {
      $state.transitionTo('event', {
        id: id
      });
    };
  }
);
