'use strict';

angular.module('letsV2App')
  .factory('eventFact', function ($resource) {
    // Service logic
    // ...
    var resource = $resource('/api/event/:id',{ id: '@id'},
    {
      saveEvent: {
        method: 'POST'
      },
      addResponse: {
        method: 'PUT'
      },
      getEventById: {
        method: 'GET'
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
        endDate: findEndDate(days),
        creator: eventInfo.creator
      };
      resource.saveEvent({},saveObject,callback);
    }

    function getEventById(id,callback){
      resource.getEventById({id: id},callback);
    }



    function addResponse(days,user,eventID,callback){
      var newDays = formatPostData(days,user);
      var putObject = {
        days: newDays,
        userID: user.id
      };
      resource.addResponse({id: eventID },putObject,callback);
    }

    function formatPostData(days,user){
      days.forEach(function(dayArr){
        dayArr.forEach(function(timeObj){
          if (timeObj.response[user.id]){
            timeObj.response[user.id].name = user.name;
          }
        });
      });
      return days;
    }

    // Public API here
    return {
      save: saveEvent,
      get: getEventById,
      addResponse: addResponse
    };
  });
