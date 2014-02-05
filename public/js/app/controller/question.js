/* global angular */
angular.module('acm').controller('questionCtrl',
  function ($scope, $rootScope, $window, $state, $stateParams, $upload, alerts, events) {
    'use strict';

    var id = $stateParams.id;
    var index = $stateParams.index;

    events.get(id, function (err, event) {
      if (err) return alerts.create('error', err);
      $scope.question = event.questions[index];
    });

    $scope.downloadInput = function () {
      var name = $scope.question.name + '-input.txt';
      var url = '/inp/' + id + '/' + index + '/' + name;
      $window.open(url, '_blank');
    };

    var files = {};

    $scope.setFile = function (which, $files) {
      files[which] = $files[0];
    };

    $scope.submitAnswer = function () {
      var outFiles = [];
      outFiles.push(files.out);
      outFiles.push(files.src);

      if (outFiles.length < 2)
        return alerts.create('danger', 'Missing a file!');

      $upload.upload({
        url: '/upload/' + id + '/' + index,
        file: outFiles
      }).success(function (data) {
        if (!data.success) return alerts.create('danger', data.err);
        alerts.create('success', data.msg);
        $scope.question.solved = true;
        $rootScope.$emit('q:solved', index);
      }).error(function (err) {
        alerts.create('danger', err);
      });
    };
  }
);
