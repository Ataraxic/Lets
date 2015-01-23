'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var daySchema = new Schema({
  timeInMs: Number,
  suggested: Boolean,
  response: Object,
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
  ownerEmail: String,
  location: {type: String, default: "none"},
  contacts: [contactSchema],
  endDate: {type: Date }
},{minimize: false});

module.exports = mongoose.model('Event', EventSchema);
