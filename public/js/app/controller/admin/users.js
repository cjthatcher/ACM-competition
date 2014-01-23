/* global angular */
angular.module('acm').controller('adminUsersCtrl',
  function ($scope, $modal, adminUsers, alerts) {
    'use strict';
    adminUsers.all(function (err, users) {
      if (err) return alerts.create('error', err);
      $scope.users = users;
    });

    $scope.edit = function (user) {
      $modal.open({
        templateUrl: 'tmpl/m/edit-user.html',
        controller: 'mEditUser',
        resolve: {
          curUser: function () {
            return JSON.parse(JSON.stringify(user));
          }
        }
      }).result.then(function (modUser) {
        alerts.create('info', 'Saving User: ' + modUser.username + '...');
        adminUsers.update(modUser, function (err) {
          if (err) return alerts.create('error', err);
          alerts.create('success', 'User: ' + modUser.username + ' has been saved!');
          var i = $scope.users.indexOf(user);
          $scope.users[i] = modUser;
        });
      });
    };

    $scope.create = function () {
      $modal.open({
        templateUrl: 'tmpl/m/create-user.html',
        controller: 'mCreateUser'
      }).result.then(function (user) {
        alerts.create('info', 'Creating User: ' + user.username + '...');
        debugger;
      });
    };

    $scope.remove = function (user) {
      adminUsers.remove(user.username, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'User ' + user.username + ' has been deleted!');
        var i = $scope.users.indexOf(user);
        $scope.users.splice(i, 1);
      });
    };

    $scope.resetPass = function (user) {
      adminUsers.resetPass(user.username, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Password Reset Email Sent!');
      });
    };
  }
);
