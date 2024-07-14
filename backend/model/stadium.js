const mongoose = require("mongoose");
const stadiumSchema = new mongoose.Schema({
  stadium_name: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  provice: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: true,
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
    },
  ],
  stadium_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StadiumOwner",
  },
});
stadiumSchema.index({ stadium_name: "text", address: "text", phone: "text" });
let Stadium = mongoose.model("Stadium", stadiumSchema);
module.exports = { Stadium };
