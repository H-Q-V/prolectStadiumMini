const mongoose = require('mongoose');
const bookPitchSchema = new mongoose.Schema({
  phone: {
    type: String,
  },
  totalAmount:{
    type: Number,
  },
  deposit:{
    type: Number,
  },
  periodic:{
    type: String,
  },
  time:[
    {
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stadium',
  },
  stadiumStyle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stadium.stadium_styles',
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('BookPitch', bookPitchSchema);
