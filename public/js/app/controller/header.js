/* global angular */
angular.module('acm').controller('headerCtrl',
  function ($scope, $state, nav, user) {
    'use strict';

    $scope.nav = nav;
    $scope.state = $state;
    $scope.user = user;

    $scope.goTo = function (state) {
      $state.transitionTo(state);
    };

    $scope.security = function (item) {
      if (item.hidden) return false;

      if (item.loggedIn) return !!user.data;
      if (item.loggedIn === false) return !user.data;

      if (item.admin) return user.data && user.data.isAdmin;
      return true;
    };

    $scope.logout = function () {
      user.logout();
    };

    user.check();
  }
);


