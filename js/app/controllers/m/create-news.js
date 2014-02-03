/* global angular */
angular.module('acm').controller('createNews',
  function ($scope, $modalInstance) {
    'use strict';

    $scope.news = {
      title: 'hi',
      paragraphs: [
        { text: '' }
      ]
    };

    $scope.addParagraph = function () {
      $scope.news.paragraphs.push({ text: '' });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.create = function (news) {
      $modalInstance.close(news);
    };
  }
);
