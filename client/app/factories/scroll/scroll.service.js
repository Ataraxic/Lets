'use strict';

angular.module('letsV2App')
  .factory('scroll', function () {
    // Service logic
    // ...
    var isMouseDown = false;
    var startIndex = 0;
    var endIndex = 0;
    var type = '';
    var initVal;
    function onMouseDown(day,index,inputType){
      isMouseDown = true;
      startIndex = index;
      type = inputType;
      // if (endIndex===0) { endIndex = index;}
      if (type==='suggested'){
        initVal = day[index].suggested;
        day[index].suggested=!initVal;
      }
      return [startIndex,endIndex];
    }

    function onMouseOver(day,index){
      if (isMouseDown){
        endIndex = index;
        if (type==='suggested' && initVal===day[index].suggested){
          day[index].suggested=!initVal;
        }
        if (endIndex<startIndex){
          var temp = endIndex;
          endIndex = startIndex;
          startIndex = temp;
        }
      }
      return [startIndex,endIndex];
    }

    function onMouseUp(day,index){
      if (isMouseDown){
        if (type==='suggested' && initVal===day[index].suggested){
          day[index].suggested = !initVal;
        }
        type = '';
        isMouseDown = false;
        startIndex = 0;
        endIndex = 0;
        initVal = null;
      }
      return [startIndex,endIndex];
    }
    // Public API here
    return {
      onMouseDown: onMouseDown,
      onMouseOver: onMouseOver,
      onMouseUp: onMouseUp
    };
  });
