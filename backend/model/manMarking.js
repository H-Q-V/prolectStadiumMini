const mongoose = require("mongoose");
const manMakingSchema = new mongoose.Schema({
    teamSends:{
     type: String,
    },
    teamReceives: {
     type: String,
    },
    ownerTeamSends:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Customer',
    },
    ownerTeamReceives:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Customer',
    },
    status:{
     type: String,
     enum: ["accept","pending","cancelled"],
     default: "pending",
    }
});

module.exports = mongoose.model("ManMaking", manMakingSchema);

