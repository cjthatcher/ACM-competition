/* global angular */
angular.module('acm').controller('footerCtrl',
  function ($scope, alerts) {
    'use strict';

    // $scope.year = (new Date()).getFullYear();
    $scope.alerts = alerts.alerts;
    $scope.closeAlert = alerts.close;
  }
);
