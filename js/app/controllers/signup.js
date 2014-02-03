/* global angular, Firebase */
angular.module('acm').controller('signupCtrl',
  function ($scope, $firebaseSimpleLogin, $state, alerts) {
    'use strict';

    var dataRef = new Firebase('https://acm.firebaseio.com');
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    $scope.signup = function (email, pass) {
      $scope.loginObj.$createUser(email, pass).then(function () {
        $state.transitionTo('index');
      }, function (err) {
        var msg = err.message.replace('FirebaseSimpleLogin: ', '');
        alerts.create('danger', msg);
      });
    };

    $scope.github = function () {
      $scope.loginObj.$login('github').then(function () {
        $state.transitionTo('index');
      }, function (err) {
        var msg = err.message.replace('FirebaseSimpleLogin: ', '');
        alerts.create('danger', msg);
      });
    };
  }
);
