/* global angular */
angular.module('acm').controller('adminEventsCtrl',
  function ($scope, user, events) {
    'use strict';

    $scope.user = user;

    events.all(function (err, data) {
      if (err) return $scope.err = err;
      $scope.events = data;
    });

    $scope.createEvent = function (name, description) {
      var event = {
        name: name,
        description: description,
        available: false
      };

      events.create(event, function (err, id) {
        if (err) return $scope.err = err;
        event.id = id;
        $scope.events.push(event);
      })
    }

    $scope.toggleEvent = function (event) {
      event.available = !event.available;
    }

    $scope.editEvent = function (event) {

    }

    $scope.deleteEvent = function (event) {
      events.remove(event.id, function (err) {
        if (err) return $scope.err = err;
        var index = $scope.events.indexOf(event);
        $scope.events.splice(index, 1);
      });
    }
  }
);
