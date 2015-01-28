'use strict';

angular.module('letsV2App')
  .controller('MainCtrl', function ($scope,dayTime,scroll,eventFact,$location) {
    $scope.selectedDates = [];
    $scope.days = [];
    $scope.dayHours = [];
    $scope.minDate = new Date();
    dayTime.setSelected($scope.selectedDates.slice()); //make a copy of selected Dates for comparison in factory
    $scope.dateChosen = true;
    $scope.eventCreated = false;
    $scope.startIndex = 0; //not yet implemented
    $scope.endIndex = 0; //not yet implemented
    $scope.updateDay = function(){
      dayTime.updateDay($scope.selectedDates,$scope.days,$scope.dayHours);
    };
    $scope.showRow = function(index){
      return index%2===0;
    };
    $scope.startDrag = function(day,index){
      scroll.onMouseDown(day,index,'suggested');
    };
    $scope.onMouseOver = function(day,index){
      scroll.onMouseOver(day,index);
    };
    $scope.onMouseUp = function(day,index){
      scroll.onMouseUp(day,index);
    };
    $scope.saveEvent = function(){
      if ($scope.days.length!==0){
        eventFact.save($scope.days,$scope.event,function(returned){
          $scope.eventCreated = true;
          var path = 'http://localhost:9000/event/'+returned._id;
          $scope.eventLink = path;
          // $location.path('event/'+returned._id.toString());
        });
      } else {
        $scope.dateChosen = false;
      }
    };
    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
  });
