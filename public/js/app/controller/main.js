/* global angular */
angular.module('acm').controller('mainCtrl',
  function ($scope, $http) {
    'use strict';

    $http.get('/user').success(function (data) {
      if (data.success)
        $scope.user = data.user;
   });

    $scope.logout = function() {
      $http.post('/logout').success(function () {
        window.location.reload();
      });
    };
  }
);
