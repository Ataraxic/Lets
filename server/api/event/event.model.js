'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var responseSchema = new Schema({
  name: String,
  UUID: String,
  response: String
})


var daySchema = new Schema({
  timeInMs: Number,
  suggested: Boolean,
  response: [responseSchema]
})

var contactSchema = new Schema({
  name: { type: String, required: true},
  days: [],
  email: String,
  UUID: {type: String, required: true},
  owner: [{type: Schema.Types.ObjectId, ref: 'Events'}],
  facebook: {},
  google: {}
})

var EventSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  days: [Schema.Types.Mixed],
  creator: {
    name: {type: String, required: true},
    email: {type: String, required: true}
  },
  location: {type: String, default: "none"},
  contacts: [contactSchema],
  endDate: {type: Date },
  responded: [String]
},{minimize: false});

module.exports = mongoose.model('Event', EventSchema);
