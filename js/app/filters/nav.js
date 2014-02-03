/* global angular, _ */
angular.module('acm').filter('nav',
  function () {
    'use strict';
    return function (val) {
      if (!_.isArray(val)) return val;

      var arr = [];
      _.each(val, function (item) {
        if (item.hidden) return;
        arr.push(item);
      });
      return arr;
    };
  }
);
