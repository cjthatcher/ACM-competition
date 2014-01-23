/* global angular */
angular.module('acm').controller('adminEventsCtrl',
  function ($scope, alerts, user, adminEvents) {
    'use strict';

    $scope.user = user;

    adminEvents.all(function (err, data) {
      if (err) return alerts.create('error', err);
      $scope.events = data;
    });

    $scope.createEvent = function (name, description) {
      var event = {
        name: name,
        description: description,
        available: false
      };

      adminEvents.create(event, function (err, id) {
        if (err) return alerts.create('error', err);
        event.id = id;
        $scope.events.push(event);
      });
    };

    $scope.toggleEvent = function (event) {
      event.available = !event.available;
    };

    $scope.editEvent = function (event) {

    };

    $scope.deleteEvent = function (event) {
      adminEvents.remove(event.id, function (err) {
        if (err) return alerts.create('error', err);
        var index = $scope.events.indexOf(event);
        $scope.events.splice(index, 1);
      });
    };
  }
);
