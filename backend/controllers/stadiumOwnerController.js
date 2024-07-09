const {StadiumOwner} = require("../model/stadiumOwner");

const stadiumOwnerController = {
       addStadiumOwner: async(req,res) => {
        try{
            const newStadiumOwner = new StadiumOwner(req.body);
            const saveStadiumOwner = await newStadiumOwner.save();
            res.status(200).json(saveStadiumOwner);
        }catch(err){
            res.status(500).json(err);
         }
       },

       getAllStadiumOwner: async(req,res) => {
        try{
            const stadiumowner = await StadiumOwner.find();
            res.status(200).json(stadiumowner);
        } catch(err){
            res.status(500).json();
        }
       },

       getAnStadiumOwner: async(req,res) => {
        try{
           const stadiumOwner = await StadiumOwner.findById(req.params.id).populate("Stadium_owner");
           res.status(200).json(stadiumOwner);
        } catch(err){
            res.status(500).json(err);
        }
       },

       UpdateStaiumOwner: async(req,res) => {
          try{
            const stadiumOwner = await StadiumOwner.findById(req.params.id);
            await stadiumOwner.updateOne({$set: req.body});
            res.status(200).json("update done");
          }catch(err){
            res.status(500).json(err);
          }
       },

       DeleteStadiumOwner: async(req,res) => {
        try{
            await StadiumOwner.updateMany(
                { stadiumOwner: req.params.id},
                {$pull: {stadiumOwner: req.params.id}});
            await StadiumOwner.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete done");
        }catch(err){
            res.status(500).json(err);
        }
       }
};
module.exports = stadiumOwnerController;