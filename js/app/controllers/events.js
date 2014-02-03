/* global angular, Firebase */
angular.module('acm').controller('eventsCtrl',
  function ($scope, $firebase, $state) {
    'use strict';

    var eventsRef = new Firebase('https://acm.firebaseio.com/events');
    $scope.events = $firebase(eventsRef);

    $scope.goToEvent = function (key) {
      $state.transitionTo('specificEvent', {
        key: key
      });
    };
  }
);
