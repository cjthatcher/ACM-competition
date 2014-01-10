/* global angular*/
angular.module('acm').factory('user',
  function ($http, $rootScope, $window) {
    'use strict';
    var user = {};

    user.check = function () {
      $http.get('/user').success(function (data) {
        if (data.success) {
          user.data = data.user;
          $rootScope.$emit('logged-in');
        } else {
          user.data = null;
        }
      });
    };

    user.login = function(name, pass, cb) {
      var userObj = {
        username: name,
        password: pass
      };

      $http.post('/login', userObj).success(function (data) {
        if (!data.success) return cb(data.err);
        user.data = data.user;
        $rootScope.$emit('logged-in');
      });
    };

    user.signup = function (userObj, cb) {
      $http.post('/signup', userObj).success(function (data) {
        if (!data.success) return cb(data.err);
        user.data = data.user;
        $rootScope.$emit('logged-in');
      });
    };

    user.logout = function () {
      $http.post('/logout').success(function () {
        $window.location.reload();
      });
    };

    user.on = function (cb) {
      if (user.data) return cb();
      $rootScope.$on('logged-in', cb);
    };

    return user;
  }
);
