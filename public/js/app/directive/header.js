/* global angular */
angular.module('acm').directive('header',
  function () {
    'use strict';

    return {
      restrict: 'A',  // EACM
      templateUrl: 'tmpl/header.html',
      controller: 'headerCtrl'
    };
  }
);




// <header></header>            E

// <div header></div>           A

// <div class="header"></div>   C

// /* header */                 M
