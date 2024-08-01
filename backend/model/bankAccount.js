const mongoose = require('mongoose');
const bankAccountSchema = new mongoose.Schema({
    acc:{
        type: String
    },
    name:{
        type: String
    },
    bank:{
        type: String
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    }
});
module.exports = mongoose.model('BankAccount', bankAccountSchema);