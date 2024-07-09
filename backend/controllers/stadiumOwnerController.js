const {StadiumOwner} = require("../model/stadiumOwner");

const stadiumOwnerController = {
       addStadiumOwner: async(req,res) => {
        try{
            const newStadiumOwner = new StadiumOwner(req.body);
            const saveStadiumOwner = await newStadiumOwner.save();
            return res.status(200).json(saveStadiumOwner);
        }catch(err){
            return res.status(500).json(err);
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