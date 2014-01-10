/* global angular */
angular.module('acm').controller('loginCtrl',
  function ($scope, $state, user) {
    'use strict';

    user.on(function () {
      $state.transitionTo('index');
    });

    $scope.login = function (name, pass) {
      user.login(name, pass, function (err) {
        $scope.error = err;
      });
      return false;
    };
  }
);
