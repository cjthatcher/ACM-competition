/* global angular, Firebase */
angular.module('acm').controller('eventCtrl',
  function ($scope, $stateParams, $firebase, $state) {
    'use strict';

    var key = $stateParams.key;

    var eventRef = new Firebase('https://acm.firebaseio.com/events/' + key);
    $scope.event = $firebase(eventRef);

    var questionsRef = new Firebase('https://acm.firebaseio.com/questions/' + key);
    $scope.questions = $firebase(questionsRef);

    $scope.back = function () {
      $state.transitionTo('events');
    };

    $scope.goToQuestion = function (id) {
      $state.transitionTo('specificEvent.question', {
        key: key,
        id: id
      });
    };
  }
);
