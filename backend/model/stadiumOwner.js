const mongoose = require("mongoose");
const stadiumOwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
let StadiumOwner = mongoose.model("StadiumOwner", stadiumOwnerSchema);
module.exports = {StadiumOwner};
