const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 40,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,  
    },
    admin:{
        type: Boolean,
        default: false,
    },
}, 
   {timestamps:true}
);
module.exports = mongoose.model("Customer", customerSchema);