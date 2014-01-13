/* global angular */
angular.module('acm').directive('footer',
  function () {
    'use strict';

    return {
      restrict: 'A',
      templateUrl: 'tmpl/footer.html',
      controller: 'footerCtrl'
    };
  }
);
