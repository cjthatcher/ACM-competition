/* global angular */
angular.module('acm').factory('adminEvents',
  function ($http) {
    'use strict';

    function getEvents(cb) {
      $http.get('/a/events').success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.events);
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    function createEvent(event, cb) {
      $http.post('/a/event', event).success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.id);
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    function deleteEvent(id, cb) {
      $http.delete('/a/event/' + id).success(function (data) {
        if (!data.success) return cb(data.err);
        cb();
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    return {
      all: getEvents,
      create: createEvent,
      remove: deleteEvent
    };
  }
);
