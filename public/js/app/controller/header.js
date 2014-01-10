/* global angular */
angular.module('acm').controller('headerCtrl',
  function ($scope, $state, nav, user) {
    'use strict';
    $scope.nav = nav;
    $scope.state = $state;
    $scope.user = user;

    user.check();

    $scope.security = function (item) {
      if (item.loggedIn) return !!user.data;
      if (item.loggedIn === false) return !user.data;
      return true;
    };

    $scope.logout = function () {
      user.logout();
    };
  }
);


