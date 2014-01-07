/* global angular */
angular.module('acm').controller('headerCtrl',
  function ($scope, nav) {
    'use strict';
    $scope.nav = nav;
  }
);


