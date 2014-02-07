/* global angular, _ */
angular.module('acm').filter('successful',
  function () {
    'use strict';

    return function (arr, expr) {
      if (!expr) return arr;
      if (!_.isArray(arr)) return arr;
      var res = _.where(arr, { success: true });
      return res;
    };
  }
);
