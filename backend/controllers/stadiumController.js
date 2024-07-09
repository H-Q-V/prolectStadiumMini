const { Stadium } = require("../model/stadium");
const { uploadImage } = require("../uploadImage/uploadImage");
const stadiumController = {
  addStadium: async (req, res) => {
    try {
      const { stadium_name, address, phone, image, describe, stadium_style } =
        req.body;
      const uploadedImage = await uploadImage(image);

      const response = await Stadium.create({
        image: uploadedImage.secure_url,
        stadium_name: stadium_name,
        address: address,
        describe: describe,
        stadium_style: stadium_style,
        phone: phone,
      });
      return res.status(200).json({ success: true, data: response });
    } catch (err) {
      console.log("🚀 ~ addStadium: ~ err:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error create stadium" });
    }
  },

  //get all stadium
  getAllStadium: async (req, res) => {
    try {
      const stadium = await Stadium.find();
      return res.status(200).json({ success: true, data: stadium });
    } catch (err) {
      console.log("🚀 ~ getAllStadium: ~ err:", err);
      res
        .status(500)
        .json({ success: false, message: "Error get all stadium" });
    }
  },

  getAStadium: async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.id);
      res.status(200).json({ success: true, data: stadium });
    } catch (error) {
      console.log("🚀 ~ getAStadium:async ~ error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error get a stadium" });
    }
  },
  updateStadium: async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.id);
      await stadium.updateOne({ $set: req.body });
      return res
        .status(200)
        .json({ success: true, message: "Cập nhật thành công" });
    } catch (err) {
      console.log("🚀 ~ updateStadium: ~ err:", err);
      return res.status(500).json({ success: false, message: err });
    }
  },
  deleteStadium: async (req, res) => {
    try {
      await Stadium.updateMany(
        { stadium: req.params.id },
        { $pull: { stadium: req.params.id } }
      );
      await Stadium.findByIdAndDelete(req.params.id);
      res.status(200).json("deletes succsessfully");
    } catch (err) {
      res.status(200).json(err);
    }
  },
};
module.exports = stadiumController;
