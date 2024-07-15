const {StadiumOwner} = require("../model/stadiumOwner");

const stadiumOwnerController = {
       addStadiumOwner: async(req,res) => {
       /*
        try{
            const newStadiumOwner = new StadiumOwner(req.body);
            const saveStadiumOwner = await newStadiumOwner.save();
            return res.status(200).json(saveStadiumOwner);
        }catch(err){
            return res.status(500).json(err);
         }
        */
        try{
            const{
                name,
                phone,
                address,
            } = req.body;
            if(!name || !phone ||! address){
                return res.status(400).json({status: false, message:"Nhập sai thông tin"});
            }
            const phoneRegex = /^[0-9]{10}$/;
            if(!phoneRegex.test(phone)){
                return res.status(400).json({status:false, message:"Nhập sai thông tin"});
            }
            const response =  await StadiumOwner.create({
                name: name,
                phone: phone,
                address: address,
            });
            return res.status(200).json({status:true, data:response});
        } catch(err){
            return res.status(500).json({success: false, message:"Nhập thông tin bị lỗi"});
        }
       },
    

       getAllStadiumOwner: async(req,res) => {
        try{
            const stadiumowner = await StadiumOwner.find();
            return res.status(200).json(stadiumowner);
        } catch(err){
            return res.status(500).json(err);
        }
       },

       getAnStadiumOwner: async(req,res) => {
        try{
           const stadiumOwner = await StadiumOwner.findById(req.params.id).populate("Stadium_owner");
            return res.status(200).json(stadiumOwner);
        } catch(err){
            return res.status(500).json(err);
        }
       },

       UpdateStaiumOwner: async(req,res) => {
          try{
            const stadiumOwner = await StadiumOwner.findById(req.params.id);
            await stadiumOwner.updateOne({$set: req.body});
            return res.status(200).json("update done");
          }catch(err){
            return res.status(500).json(err);
          }
       },

       DeleteStadiumOwner: async(req,res) => {
        try{
            await StadiumOwner.updateMany(
                { stadiumOwner: req.params.id},
                {$pull: {stadiumOwner: req.params.id}});
            await StadiumOwner.findByIdAndDelete(req.params.id);
            return res.status(200).json("Delete done");
        }catch(err){
            return res.status(500).json(err);
        }
       }
};
module.exports = stadiumOwnerController;