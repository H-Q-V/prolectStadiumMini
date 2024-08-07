const mongoose = require("mongoose");
const revenueSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    totalMonney:{
        type: Number,
        required: true   
    }
});

module.exports = mongoose.model("Revenue", revenueSchema);

