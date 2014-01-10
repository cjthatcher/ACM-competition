/* global angular */
angular.module('acm').controller('adminCtrl',
  function ($scope, user) {
    'use strict';
    $scope.user = user;

    var events = [];

    $scope.events = events;

    $scope.createEvent = function (name, description) {
      $scope.events.push({
        name: name,
        description: description,
        available: false
      });
    }

    $scope.toggleEvent = function (event) {
      event.available = !event.available;
    }

    $scope.editEvent = function (event) {
      
    }

    $scope.deleteEvent = function (event) {
      var index = events.indexOf(event);
      events.splice(index, 1);
    }
  }
);