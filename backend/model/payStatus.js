const mongoose = require('mongoose');

const payStatusSchema = new mongoose.Schema({
    User: { type: String, required: true },
    Charity: { type: String, required: true },
    Amount: { type: Number, required: true },
    Status: { type: String, required: true }, // You may consider using an enum for status values
    //payment: { type: String, default: null },
    Code: { type: String, default: null }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('PayStatus', payStatusSchema);
