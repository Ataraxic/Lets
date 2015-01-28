'use strict';

angular.module('letsV2App')
  .factory('listFact', function () {
    // Service logic
    // ...
    var dayIndices = [];
    var dayListArr = [];
    function initList(scopeDays){
      scopeDays.forEach(function(){
        dayIndices.push([]);
        dayListArr.push({});
      });
    }

    var ableList = [];
    var maybeList = [];
    var unableList = [];
    var listHash = {};

    function modifyDayIndices(timeIndex,dayIndex,day){
      var indexToRemove = dayIndices[dayIndex].indexOf(timeIndex);
      if (indexToRemove<0){
        dayIndices[dayIndex].push(timeIndex);
      } else {
        dayIndices[dayIndex].splice(indexToRemove,1);
      }
      console.log('indices',dayIndices[dayIndex]);
      return generateHash(dayIndex,day);
    }

    var resArr = ['able','maybe','unable'];
    function  generateHash(dayIndex,day){
      dayIndices[dayIndex].forEach(function(i){
        for (var keys in day[i].response){
          if (!listHash[keys]){
            listHash[keys] = day[i].response[keys].resStr;
          }
          var resVal = resArr.indexOf(day[i].response[keys].resStr);
          var listVal = resArr.indexOf(listHash[keys].resStr);
          if (resVal>listVal){
            listHash[keys] = day[i].response[keys];
          }
        }
      });
      console.log('listHash',listHash);
      return generateLists(dayIndex);
    }

    function generateLists(dayIndex){
      for (var keys in listHash){
        if (listHash[keys].resStr==='able'){
          ableList.push(listHash[keys]);
        } else if (listHash[keys].resStr==='maybe') {
          maybeList.push(listHash[keys]);
        } else {
          unableList.push(listHash[keys]);
        }
      }
      dayListArr[dayIndex].able = ableList;
      dayListArr[dayIndex].maybe = maybeList;
      dayListArr[dayIndex].unable = unableList;
      ableList = [];
      maybeList = [];
      unableList = [];
      listHash = {};
      return dayListArr[dayIndex];
    }


    // Public API here
    return {
      initList: initList,
      genList: modifyDayIndices
    };
  });
