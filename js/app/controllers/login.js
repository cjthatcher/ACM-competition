/* global angular, Firebase */
angular.module('acm').controller('loginCtrl',
  function ($scope, $firebaseSimpleLogin, $state, alerts) {
    'use strict';

    var dataRef = new Firebase('https://acm.firebaseio.com');
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    $scope.login = function (email, password, rememberMe) {
      $scope.loginObj.$login('password', {
        email: email,
        password: password,
        rememberMe: rememberMe
      }).then(function () {
        $state.transitionTo('index');
      }, function (err) {
        var msg = err.message.replace('FirebaseSimpleLogin: ', '');
        alerts.create('danger', msg);
      });
    };
  }
);
