const Customer = require("../model/customer");
const bcrypt = require("bcrypt");
const authController = {
    //register
    registerCustomer: async(req,res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            // create new customer
            const newCustomer = await new Customer({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })
            const customer = await newCustomer.save();
            res.status(200).json(customer);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // login
    loginCustomer: async(req,res) =>{
        try{
            const user = await Customer.findOne({username: req.body});
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = authController; 