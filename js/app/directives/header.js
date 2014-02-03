/* global angular */
angular.module('acm').directive('header',
  function () {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'tmpl/header.html',
      controller: 'headerCtrl'
    };
  }
);
