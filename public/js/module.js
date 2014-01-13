/* global angular, nav */
angular.module('acm', ['ui.router', 'ui.bootstrap']).config(
  function ($stateProvider, $urlRouterProvider) {
    'use strict';

    for (var i = 0; i < nav.length; ++i) {
      $stateProvider.state(nav[i].state, {
        templateUrl: nav[i].tmpl,
        controller: nav[i].ctrl,
        url: nav[i].v_url || nav[i].url,
        abstract: nav[i].abstract
      });
    }

    $urlRouterProvider.otherwise('/');
    /* if page not found, send to index */
  }
);
