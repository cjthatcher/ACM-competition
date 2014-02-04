/* global angular */
angular.module('acm').controller('adminEventsCtrl',
  function ($scope, $modal, $state, alerts, adminEvents) {
    'use strict';

    adminEvents.all(function (err, data) {
      if (err) return alerts.create('error', err);
      $scope.events = data;
    });

    $scope.create = function () {
      $modal.open({
        templateUrl: 'tmpl/m/event.html',
        controller: 'mEvent',
        resolve: {
          type: identity({ title: 'Creating', btn: 'Create' }),
          event: identity({})
        }
      }).result.then(function (event) {
        alerts.create('info', 'Creating New Event...');
        adminEvents.create(event, function (err, id) {
          if (err) return alerts.create('error', err);
          alerts.create('success', 'Event Successfully Created!');
          event.id = id;
          $scope.events.push(event);
        });
      });
    };

    $scope.toggleEvent = function (event) {
      event.available = !event.available;
      alerts.create('info', 'Changing Event Availability...');
      adminEvents.update(event, function (err) {
        if (err) return alerts.create('error', err);
        var status = event.available ? 'Available' : 'Unavailable';
        alerts.create('success', 'Event is now ' + status + '!');
      });
    };

    $scope.editEvent = function (event) {
      $state.transitionTo('admin.event', {
        id: event.id
      });
    };

    $scope.deleteEvent = function (event) {
      alerts.create('info', 'Deleting Event...');
      adminEvents.remove(event.id, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Event Deleted!');
        var index = $scope.events.indexOf(event);
        $scope.events.splice(index, 1);
      });
    };

    function identity(val) {
      return function () {
        return val;
      };
    }
  }
);
