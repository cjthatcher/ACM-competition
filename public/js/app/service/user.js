/* global angular */
angular.module('acm').factory('user',
  function ($http, $rootScope, $state, $window, $log) {
    'use strict';

    function redirect() {
      if (user.state) {
        $state.transitionTo(user.state.to, user.state.toParams);
      } else {
        $state.transitionTo('index');
      }
    }

    var user = {};

    user.check = function () {
      $http.get('/user').success(function (data) {
        user.data = data.user;
        $rootScope.$emit('user-check');
      }).error(function (err) {
        $log.log(err);
        user.data = null;
        $rootScope.$emit('user-check');
      });
    };

    user.login = function(name, pass, cb) {
      var userObj = {
        name: name,
        pass: pass
      };

      $http.post('/login', userObj).success(function (data) {
        if (!data.success) return cb(data.err);
        user.data = data.user;
        $rootScope.$emit('user-check');
        cb();
        redirect();
      });
    };

    user.signup = function (userObj, cb) {
      $http.post('/signup', userObj).success(function (data) {
        if (!data.success) return cb(data.err);
        user.data = data.user;
        $rootScope.$emit('user-check');
        cb();
        redirect();
      });
    };

    user.logout = function () {
      $http.post('/logout').success(function () {
        $window.location.reload();
      });
    };

    user.on = function (cb) {
      if (user.data !== undefined) return cb();
      $rootScope.$on('user-check', cb);
    };

    return user;
  }
);
