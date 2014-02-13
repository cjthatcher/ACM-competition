/* global angular */
angular.module('acm').controller('loginCtrl',
  function ($scope, alerts, user) {
    'use strict';

    $scope.login = function (name, pass) {
      user.login(name, pass, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Successful Login!!');
      });
      return false;
    };
  }
);
