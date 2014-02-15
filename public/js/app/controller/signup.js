/* global angular */
angular.module('acm').controller('signupCtrl',
  function ($scope, $log, alerts, user) {
    'use strict';




    $scope.progress = false;
    $scope.signup = function (userObj, confirm) {
      if (!userObj.name) return alerts.create('error', 'Missing Username.');
      if (!userObj.pass) return alerts.create('error', 'Missing Password.');
      if (!userObj.email) return alerts.create('error', 'Missing or Invalid Email.');
      if (!userObj.first) return alerts.create('error', 'Missing First Name.');
      if (!userObj.last) return alerts.create('error', 'Missing Last Name.');
      if (userObj.pass !== confirm) return alerts.create('error', 'Passwords don\'t match');
      $scope.progress = true;
      user.signup(userObj, function (err) {
        $scope.progress = false;
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Successful Signup!!');
      });
      return false;
    };
  }
);
