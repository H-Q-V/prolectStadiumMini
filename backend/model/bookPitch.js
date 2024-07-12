const mongoose = require("mongoose");
const bookPitchSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  startTime: {
    type: DateTime,
    required: true,
  },
  endTime: {
    type: DateTime,
    required: true,
  },
});

module.exports = mongoose.model("BookPitch", bookPitchSchema);
