const mongoose = require("mongoose");
const stadiumOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    required: true,
  },
  stadium: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stadium",
    },
  ],
});
let StadiumOwner = mongoose.model("StadiumOwner", stadiumOwnerSchema);
module.exports = { StadiumOwner };
