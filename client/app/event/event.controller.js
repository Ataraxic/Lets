'use strict';

angular.module('letsV2App')
  .controller('EventCtrl', function ($scope,$stateParams,eventFact,scroll,localStorageService,contactsFact,responseFact,listFact) {
    $scope.userID = contactsFact.getUserID($stateParams.id);
    var user = {};
    user.id = $scope.userID;
    eventFact.get($stateParams.id,function(retEvent){
      $scope.event = {
        name: retEvent.name,
        description: retEvent.description,
        location: retEvent.location,
        responseNumber: retEvent.numResponses,
        creator: retEvent.creator
      };
      $scope.days = retEvent.days;
      $scope.contacts = retEvent.contacts;
      $scope.dayHours = retEvent.days[0].filter(function(time,index){
        return (index%2 === 0);
      });
      $scope.days = responseFact.initRes($scope.days,$scope.userID);
      //MAybe this will work for production
      // responseFact.countRes($scope.days);
      // $scope.fakeArr = [];
      // $scope.responseNumber = retEvent.responded.length;
      // for (var i=0;i<$scope.responseNumber;i++){
      //   $scope.fakeArr.push(i);
      // }


      // /Generating Fake Data;
      $scope.days.forEach(function(dayArr){
        dayArr.forEach(function(dayTimeObj){
          dayTimeObj.response['aaa'] ={
            resStr: ((Math.random()>.5) ? 'unable' : ((Math.random()>.5) ? 'able' : 'maybe')),
            name: 'moe'
          };
          dayTimeObj.response['bbb'] ={
            resStr: ((Math.random()>.5) ? 'unable' : ((Math.random()>.5) ? 'able' : 'maybe')),
            name: 'homer'
          };
        });
      });
      responseFact.countRes($scope.days);
      $scope.responseNumber = 2;
      $scope.fakeArr = [];
      for (var i=0;i<$scope.responseNumber;i++){
        $scope.fakeArr.push(i);
      }
      //End of fake functions
      listFact.initList($scope.days);
    });

    $scope.contactsIndex = [];
    $scope.genList = function(timeIndex,dayIndex,day){
      $scope.listView = listFact.genList(timeIndex,dayIndex,day);
      var existenceVal = $scope.contactsIndex.indexOf(timeIndex);
      if (existenceVal<0){
        $scope.contactsIndex.push(timeIndex);
      } else {
        $scope.contactsIndex.splice(existenceVal,1);
      }
    };
    $scope.onMouseDown = responseFact.onMouseDown;
    $scope.onMouseOver = responseFact.onMouseOver;
    $scope.onMouseUp = responseFact.onMouseUp;
    $scope.updateEvent = function(){
      user.name = $scope.user.name;
      eventFact.addResponse($scope.days,user,$stateParams.id,function(result){
        console.log('addResponse result',result);
        $scope.days = result.days;
        responseFact.countRes($scope.days);
        $scope.fakeArr = [];
        $scope.responseNumber = result.responded.length;
        for (var i=0;i<$scope.responseNumber;i++){
          $scope.fakeArr.push(i);
        }
      });
    };
  });
