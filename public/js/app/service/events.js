/* global angular */
angular.module('acm').factory('events',
  function ($http) {
    'use strict';

    function getAllEvents(cb) {
      $http.get('/allEvents').success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.events);
      }).error(function (err) {
        cb(err);
      });
    }

    function getEvent(id, cb) {
      $http.get('/event/' + id).success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.event);
      }).error(function (err) {
        cb(err);
      });
    }

    return {
      all: getAllEvents,
      get: getEvent
    };
  }
);
