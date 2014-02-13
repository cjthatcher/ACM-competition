/* global angular, nav, _ */
angular.module('acm', ['ui.router', 'ui.bootstrap', 'angularFileUpload']).config(
  function ($stateProvider, $urlRouterProvider) {
    'use strict';

    _.each(nav, function (item) {
      var state = {
        templateUrl: item.tmpl,
        controller: item.ctrl,
        url: item.url
      };

      append(state, item, 'abstract');
      append(state, item, 'loggedIn');
      append(state, item, 'admin');

      $stateProvider.state(item.state, state);
    });

    function append(state, item, key) {
      if (item[key] !== undefined) state[key] = item[key];
    }

    $urlRouterProvider.otherwise('/');
  }
);
