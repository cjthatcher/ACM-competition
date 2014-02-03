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
        label: 'News',
        state: 'admin.news'
      }
    ];

    $scope.goTo = function (state) {
      $state.transitionTo(state);
    };
  }
);
