/* global angular, Firebase */
angular.module('acm').controller('adminNewsCtrl',
  function ($scope, $firebase, $modal, $state) {
    'use strict';

    var newsRef = new Firebase('https://acm.firebaseio.com/news');
    $scope.news = $firebase(newsRef);

    $scope.createNews = function () {
      $modal.open({
        templateUrl: 'tmpl/m/create-news.html?cache=' + Math.random(),
        controller: 'createNews'
      }).result.then(function (event) {
        $scope.events.$add(event);
      });
    };

    $scope.deleteEvent = function (key) {
      $scope.events.$remove(key);
      questions.$remove(key);
      answers.$remove(key);
    };

    $scope.toggleEvent = function (key, state) {
      var event = $scope.events.$child(key);
      event.available = !state;
      event.$save('available');
    };

    $scope.editEvent = function (key) {
      $state.transitionTo('admin.questions', {
        key: key
      });
    };
  }
);
