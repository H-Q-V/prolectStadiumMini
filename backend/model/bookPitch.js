const mongoose = require('mongoose');
const bookPitchSchema = new mongoose.Schema({
  phone: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stadium',
  },

  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending',
  },
});

module.exports = mongoose.model('BookPitch', bookPitchSchema);
