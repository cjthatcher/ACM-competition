/* global angular */
angular.module('acm').controller('loginCtrl',
  function ($scope, $log, alerts, user) {
    'use strict';

    $scope.progress = false;
    $scope.login = function (name, pass) {
      if (!name) return alerts.create('error', 'Missing Username.');
      if (!pass) return alerts.create('error', 'Missing Password.');
      $scope.progress = true;
      user.login(name, pass, function (err) {
        $scope.progress = false;
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Successful Login!!');
      });
      return false;
    };
  }
);
