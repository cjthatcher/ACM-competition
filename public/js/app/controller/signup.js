/* global angular */
angular.module('acm').controller('signupCtrl',
  function ($scope, $state, alerts, user) {
    'use strict';

    user.on(function () {
      $state.transitionTo('index');
    });

    $scope.signup = function (userObj) {
      user.signup(userObj, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Successful Signup!!');
      });

      return false;
    };
  }
);
