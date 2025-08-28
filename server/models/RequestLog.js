const mongoose = require('mongoose');

const requestLogSchema = new mongoose.Schema({
  method: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  statusCode: {
    type: Number,
    required: false,
  },
  responseTime: {
    type: Number,
    required: false,
  },
  ip: {
    type: String,
    required: false,
  },
  requestBody: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  userId: {
    type: String,
    ref: 'Users',
    required: false,
  },
  device: {
    type: String,
    default: 'Unknown device',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Disable automatic timestamps
  collection: 'request_logs', // Specify collection name
});

const RequestLog = mongoose.model('RequestLog', requestLogSchema);

module.exports = RequestLog;