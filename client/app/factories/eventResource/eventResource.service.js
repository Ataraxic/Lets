'use strict';

angular.module('letsV2App')
  .factory('event', function ($resource) {
    // Service logic
    // ...
    var resource = $resource('/api/events/:id',{ id: '@id'},
    {
      saveEvent: {
        method: 'POST'
      }
    });

    function findEndDate(days){
      var lastDay = days[days.length-1];
      var lastTimeInMs = lastDay[lastDay.length-1];
      return lastTimeInMs;
    }

    function saveEvent(days,eventInfo,callback){
      var saveObject = {
        name: eventInfo.name,
        description: eventInfo.description,
        days: days,
        endDate: findEndDate(days)
      };
      resource.saveEvent({},saveObject,callback);
    }


    // Public API here
    return {
      save: saveEvent
    };
  });
