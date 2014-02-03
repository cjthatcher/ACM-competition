/* global angular, Firebase */
angular.module('acm').controller('eventQuestionCtrl',
  function ($scope, $stateParams, $firebase, alerts) {
    'use strict';

    var key = $stateParams.key;
    var id = $stateParams.id;

    var url = 'https://acm.firebaseio.com/questions/' + key + '/' + id;
    var questionRef = new Firebase(url);
    $scope.question = $firebase(questionRef);

    $scope.submit = function (/*answer*/) {
      alerts.create('danger', 'Not Implemented');
    };
  }
);
