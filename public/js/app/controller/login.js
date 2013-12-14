/* global angular */
angular.module('acm').controller('loginCtrl',
  function ($scope, $http, $state) {
    'use strict';

    $http.get('/user').success(function (data) {
      if (data.success) {
        $state.transitionTo('index');
      }
    });

    $scope.login = function() {
      var user = {
        username: $scope.username,
        password: $scope.password
      };

      $http.post('/login', user).success(function (data) {
        if (!data.success)
          $scope.error = data.err;
        else {
          $scope.user = data.user;
          $state.transitionTo('index');
        }
      });
      return false;
    };
  }
);
