/* global angular */
angular.module('acm').factory('events',
  function ($http) {
    'use strict';

    function getEvents(cb) {
      $http.get('/events').success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.events);
      });
    }

    function createEvent(event, cb) {
      $http.post('/event', event).success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.id);
      });
    }

    function deleteEvent(id, cb) {
      $http.delete('/event/' + id).success(function (data) {
        if (!data.success) return cb(data.err);
        cb();
      })
    }

    return {
      all: getEvents,
      create: createEvent,
      remove: deleteEvent
    };
  }
);
