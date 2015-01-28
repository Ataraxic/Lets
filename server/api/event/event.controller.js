'use strict';

var _ = require('lodash');
var Event = require('./event.model');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.json(200, events);
  });
};

// Get a single event
exports.show = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    return res.json(event);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  console.log("this is the body",req.body)
  Event.create(req.body, function(err, event) {
    if(err) {
      console.log('this is the err',err)
      return handleError(res, err);
    }
    return res.json(201, event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.send(404); }

    var userID = req.body.userID;
    var updated = mergeObjects(req.body,event,userID);
    if (updated.responded.indexOf(userID)<0){
      updated.responded.push(userID);
    }
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function mergeObjects(newObj,foundObj,userID){
  for (var i=0; i<foundObj.days.length;i++){
    for (var n=0; n<foundObj.days[i].length;n++){
      console.log('the ID',newObj.days[i][n].response[userID]);
      if (newObj.days[i][n].response[userID]){
        console.log('found something matching');
        foundObj.days[i][n].response[userID] = newObj.days[i][n].response[userID];
      }
    }
  }
  return foundObj;
}
