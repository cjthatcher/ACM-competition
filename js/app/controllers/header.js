/* global angular, Firebase */
angular.module('acm').controller('headerCtrl',
  function ($scope, $state, $firebaseSimpleLogin, nav) {
    'use strict';

    $scope.nav = nav;

    var dataRef = new Firebase('https://acm.firebaseio.com');
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    $scope.goTo = function (state) {
      $state.transitionTo(state);
    };

    $scope.logout = function () {
      $scope.loginObj.$logout();
    };
  }
);


