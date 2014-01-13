/* global angular */
angular.module('acm').controller('loginCtrl',
  function ($scope, $state, alerts, user) {
    'use strict';

    user.on(function () {
      $state.transitionTo('index');
    });

    $scope.login = function (name, pass) {
      user.login(name, pass, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Successful Login!!');
      });
      return false;
    };
  }
);
