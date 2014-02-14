/* global angular */
angular.module('acm').controller('adminCtrl',
  function ($scope, $state) {
    'use strict';

    $scope.nav = [
      {
        label: 'Events',
        state: 'admin.events'
      },
      {
        label: 'Users',
        state: 'admin.users'
      },
      {
        label: 'Results',
        state: 'admin.results',
        class: 'is-result-tab'
      },
      {
        label: 'Posts',
        state: 'admin.posts'
      }
    ];

    $scope.goTo = function (state) {
      $state.transitionTo(state);
    };

    $scope.isActive = function (item) {
      return $state.current.name.indexOf(item.state) === 0;
    };
  }
);
