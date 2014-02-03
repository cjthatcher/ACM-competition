/* global angular, _, nav */
angular.module('acm').config(
  function ($stateProvider, $urlRouterProvider) {
    'use strict';

    _.each(nav, function (item) {
      $stateProvider.state(item.state, {
        url: item.url,
        templateUrl: item.tmpl,
        controller: item.ctrl,
        abstract: item.abstract
      });
    });

    $urlRouterProvider.otherwise('/');
  }
);
