'use strict';

angular.module('letsV2App')
  .factory('responseFact', function () {
    // Service logic
    // ...

    function initRes(scopeDays,userID){
      for (var i=0;i<scopeDays.length;i++){
        for (var n=0;n<scopeDays[i].length;n++){
          if (!scopeDays[i][n].response[userID]){ //if User hasn't responded already, make it
            scopeDays[i][n].response[userID] = {
              resStr: 'unable',
              name: 'temp'
            };
          }
        }
      }
      return scopeDays;
    }

    var initVal;
    var isMouseDown = false;
    function dragLogic(response,type,userID){ //Must pass in response object instead of value to modify;
      if (response[userID].resStr==='unable') {
        if (type==='able'){
          response[userID].resStr = 'able';
        } else if (type==='maybe') {
          response[userID].resStr = 'maybe';
        }
      } else {
        if (response[userID].resStr==='able' && type==='maybe'){
          response[userID].resStr = 'maybe';
        } else if (response[userID].resStr==='maybe' && type==='able'){
          response[userID].resStr = 'able';
        } else {
          response[userID].resStr = 'unable';
        }
      }
    }
    function onMouseDown(timeRow,type,userID){
      isMouseDown = true;
      initVal = timeRow.response[userID].resStr;
      console.log(initVal);
      dragLogic(timeRow.response,type,userID);
    }

    function onMouseOver(timeRow,type,userID) {
      if (isMouseDown){
        dragLogic(timeRow.response,type,userID);
      }
    }

    function onMouseUp(){
      if (isMouseDown){
        isMouseDown = false;
      }
    }

    function countRes(scopeDays){
      scopeDays.forEach(function(dayArr){
        dayArr.forEach(function(timeObj){
          var numAble = 0;
          var numMaybe = 0;
          for (var keys in timeObj.response){
            if (timeObj.response[keys].resStr==='able'){
              numAble++;
            } else if(timeObj.response[keys].resStr==='maybe'){
              numMaybe++;
            }
          }
          timeObj.numAble = numAble;
          timeObj.numMaybe = numMaybe;
        });
      });
    }

    
    // Public API here
    return {
      initRes: initRes,
      onMouseDown: onMouseDown,
      onMouseOver: onMouseOver,
      onMouseUp: onMouseUp,
      countRes: countRes
    };
  });
