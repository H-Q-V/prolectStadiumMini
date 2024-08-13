const mongoose = require("mongoose");
const stadiumSchema = new mongoose.Schema({
  stadium_name: {
    type: String,
  },
  ward: {
    type: String,
  },
  city: {
    type: String,
  },
  provice: {
    type: String,
  },
  address:{
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
  },
  describe: {
    type: String,
  },
  stadium_styles: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      price: {
        type: String,
        required: true,
      },
      time: {
        type: Number,
        required: true,
      }
    },
  ],
  stadium_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
stadiumSchema.index({ stadium_name: "text", address: "text", phone: "text" });
let Stadium = mongoose.model("Stadium", stadiumSchema);
module.exports = { Stadium };
