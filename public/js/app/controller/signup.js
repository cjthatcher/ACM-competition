/* global angular */
angular.module('acm').controller('signupCtrl',
  function ($scope, $http, $state) {
    'use strict';

    $http.get('/user').success(function (data) {
      if(data.success)
        $state.transitionTo('index');
    });

    $scope.signup = function() {
      var user = {
          username: $scope.username,
          password: $scope.password,
          first_name: $scope.firstName,
          last_name: $scope.lastName,
          email: $scope.email
      };

      $http.post('/signup', user).success(function (data) {
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
