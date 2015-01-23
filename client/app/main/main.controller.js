'use strict';

angular.module('letsV2App')
  .controller('MainCtrl', function ($scope,dayTime,scroll,event) {
    $scope.selectedDates = [];
    $scope.days = [];
    $scope.dayHours = [];
    $scope.minDate = new Date;
    dayTime.setSelected($scope.selectedDates.slice()); //make a copy of selected Dates for comparison in factory
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
    $scope.onMouseDown = function(day,index){
      scroll.onMouseOver(day,index);
    };
    $scope.onMouseUp = function(day,index){
      scroll.onMouseUp(day,index);
    };
    $scope.saveEvent = function(){
      event.save($scope.days,$scope.event,function(returned){
        console.log(returned);
      });
    };
    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
  });
