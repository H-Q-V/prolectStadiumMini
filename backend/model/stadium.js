const mongoose = require("mongoose");
const { Staff } = require("./staff");
const stadiumSchema = new mongoose.Schema({
  stadium_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
    require: true,
  },
  describe: {
    type: String,
  },
  phone: {
    type: String,
    require: true,
  },
  stadium_style: [
    {
      name: {
        type: String,
      },
      type: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  Staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Staff,
    },
  ],
});

let Stadium = mongoose.model("Stadium", stadiumSchema);
module.exports = { Stadium };
