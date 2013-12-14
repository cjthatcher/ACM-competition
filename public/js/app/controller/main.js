/* global angular */
'use strict';

angular.module('acm').controller('mainCtrl',
  function ($scope, $http) {

    $http.get("/user").success(function(data){
      if(data.success)
        $scope.user = data.user;
    });

    $scope.signup = function() {
      var user = {
          username: $scope.username,
          password: $scope.password,
          first_name: $scope.firstName,
          last_name: $scope.lastName,
          email: $scope.email
      };

      $http.post('/signup', user).success(function(data) {
        console.log('w00t!');
        console.log(data);
        if (!data.success)
          $scope.error = data.err;
        else
          $scope.user = data.user;
      })

      return false;
    }

    $scope.logout = function() {
      $http.post('/logout').success(function(){
        $scope.user = false;
        window.location.reload();
      })
    }
    $scope.login = function() {
      var user = {
        username: $scope.username,
        password: $scope.password
      }

      $http.post('/login', user).success(function(data){
        if (!data.success)
          $scope.error = data.err;
        else
          $scope.user = data.user;
      });
      return false;
    }
  }
);
