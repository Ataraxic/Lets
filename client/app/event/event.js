'use strict';

angular.module('letsV2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('event', {
        url: '/event/:id',
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl'
      });
  });
