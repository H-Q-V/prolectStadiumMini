const mongoose = require("mongoose");
const revenueRecordSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "BookPitch" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    stadiumId: { type: mongoose.Schema.Types.ObjectId, ref: "Stadium" },
    amount: { type: Number },
    deposit: { type: Number },
    startTime: { type: Date },
    endTime: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RevenueRecord", revenueRecordSchema);
