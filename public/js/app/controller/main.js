/* global angular */
angular.module('acm').controller('mainCtrl',
  function ($scope, user) {
    'use strict';

    $scope.user = user;
  }
);
