/* global angular */
angular.module('acm').factory('adminUsers',
  function ($http) {
    'use strict';

    function getUsers(cb) {
      $http.get('/a/users').success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.users);
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    function createUser(user, cb) {
      $http.post('/a/user', user).success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data.id);
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    function deleteUser(name, cb) {
      $http.delete('/a/user/' + name).success(function (data) {
        if (!data.success) return cb(data.err);
        cb();
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    function updateUser(user, cb) {
      $http.post('/a/updateUser', user).success(function (data) {
        if (!data.success) return cb(data.err);
        cb();
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    function resetPassword(name, cb) {
      $http.post('/a/resetPassword', { name: name }).success(function (data) {
        if (!data.success) return cb(data.err);
        cb();
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    return {
      all: getUsers,
      create: createUser,
      remove: deleteUser,
      update: updateUser,
      resetPass: resetPassword
    };
  }
);
