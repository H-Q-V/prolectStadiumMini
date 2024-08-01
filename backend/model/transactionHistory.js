const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    acc: {
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    totalMoney: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    }


});
module.exports = mongoose.model('Transaction', transactionSchema);