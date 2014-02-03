/* global angular, Firebase */
angular.module('acm').controller('indexCtrl',
  function ($scope, $firebase) {
    'use strict';

    var newsRef = new Firebase('https://acm.firebaseio.com/news');
    $scope.news = $firebase(newsRef);
  }
);
