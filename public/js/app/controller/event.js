/* global angular */
angular.module('acm').controller('eventCtrl',
  function ($scope, $rootScope, $state, $stateParams, alerts, events) {
    'use strict';

    $scope.state = $state;

    events.get($stateParams.id, function (err, event) {
      if (err) return alerts.create('error', err);
      $scope.event = event;
    });

    $rootScope.$on('q:solved', function (e, index) {
      $scope.event.questions[index].solved = true;
    });

    $scope.openQuestion = function (index) {
      $state.transitionTo('event.question', {
        id: $stateParams.id,
        index: index
      });
    };

    $scope.openHighScores = function () {
      $state.transitionTo('event.leaderboard', {
        id: $stateParams.id
      });
    };
  }
);
