/* global angular */
angular.module('acm').controller('adminCtrl',
  function ($scope) {
    'use strict';

    $scope.nav = [
      {
        label: 'Events',
        url: '/admin/events'
      },
      {
        label: 'Users',
        url: '/admin/users'
      }
    ];
  }
);
