/* global angular */
angular.module('acm').controller('signupCtrl',
  function ($scope, $state, user) {
    'use strict';

    user.on(function () {
      $state.transitionTo('index');
    });

    $scope.signup = function () {
      var userObj = {
          username: $scope.username,
          password: $scope.password,
          first_name: $scope.firstName,
          last_name: $scope.lastName,
          email: $scope.email
      };

      user.signup(userObj, function (err) {
        $scope.error = err;
      });

      return false;
    };
  }
);
