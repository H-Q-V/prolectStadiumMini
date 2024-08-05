const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
     name:{
        type: String,
        required: true,
     },
     averageAge:{
        type: Number,
        required: true,
     },
     job:{
        type: String,
        required: true,
     },
     phone:{
        type: String,
        required: true,
     },
     teamFounder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
     }
});
module.exports = mongoose.model("Team", teamSchema);
