const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 40,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // img: [
    //   {
    //     image: {
    //       type: String,
    //     },
    //   },
    // ],
    role: {
      type: String,
      enum: ["Customer", "Admin", "StadiumOwner"],
      default: "Customer",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Customer", customerSchema);
