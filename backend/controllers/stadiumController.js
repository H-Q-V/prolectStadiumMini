const { Stadium } = require("../model/stadium");
//const { search } = require("../router/stadiumRouter");
const { uploadImage } = require("../uploadImage/uploadImage");

const stadiumController = {
  addStadium: async (req, res) => {
    try {
      const {
        stadium_name,
        province,
        district,
        phone,
        image,
        describe,
        stadium_styles,
        stadium_owner,
      } = req.body;

      const isValidVietnamPhoneNumber = (phone) => {
        const phoneRegex =
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
        return phoneRegex.test(phone);
      };

      if (!stadium_name || !province || !district || !phone || !describe) {
        return res
          .status(400)
          .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
      }

      if (!isValidVietnamPhoneNumber(phone)) {
        return res
          .status(400)
          .json({ success: false, message: "Số điện thoại không hợp lệ" });
      }
      const uploadedImage = await uploadImage(image);
      const response = await Stadium.create({
        image: uploadedImage.secure_url,
        stadium_name: stadium_name,
        province: province,
        district: district,
        describe: describe,
        stadium_styles: stadium_styles,
        stadium_owner: stadium_owner,
        phone: phone,
      });
      return res.json({ success: true, data: response });
    } catch (err) {
      console.log("🚀 ~ addStadium: ~ err:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error create stadium" });
    }
  },

  // Get all stadiums
  getAllStadium: async (req, res) => {
    try {
      const stadiums = await Stadium.find({}).populate("stadium_owner");
      return res.json({ data: stadiums });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get a specific stadium
  getAnStadium: async (req, res) => {
    try {
      const { id } = req.params;
      const stadium = await Stadium.findById(id).populate("stadium_owner");
      return res.status(200).json(stadium);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Update a stadium
  updateStadium: async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.id);
      await stadium.updateOne({ $set: req.body });
      return res.status(200).json("Updated successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete a stadium
  deleteStadium: async (req, res) => {
    try {
      await Stadium.findByIdAndDelete(req.params.id);
      return res.status(200).json("Deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  searchStadium: async (req, res) => {
    try {
      const { search, city } = req.query;

      // Tạo mảng các điều kiện tìm kiếm
      let queries = [];
      if (search) {
        queries.push({
          $or: [
            { stadium_name: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
          ],
        });
      }
      if (city) {
        queries.push({ address: { $regex: city, $options: "i" } });
      }

      // Kết hợp các điều kiện tìm kiếm với $and
      const query = queries.length > 0 ? { $and: queries } : {};

      const projection = {
        _id: 0,
        stadium_name: 1,
        address: 1,
        phone: 1,
      };

      const stadiums = await Stadium.find(query, projection);
      return res.status(200).json(stadiums);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete a stadium
  deleteStadium: async (req, res) => {
    try {
      await Stadium.findByIdAndDelete(req.params.id);
      return res.status(200).json("Deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  searchStadium: async (req, res) => {
    try {
      const { search, city } = req.query;

      // Tạo mảng các điều kiện tìm kiếm
      let queries = [];
      if (search) {
        queries.push({
          $or: [
            { stadium_name: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
          ],
        });
      }
      if (city) {
        queries.push({ address: { $regex: city, $options: "i" } });
      }

      // Kết hợp các điều kiện tìm kiếm với $and
      const query = queries.length > 0 ? { $and: queries } : {};

      const projection = {
        _id: 0,
        stadium_name: 1,
        address: 1,
        phone: 1,
      };

      const stadiums = await Stadium.find(query, projection);
      return res.status(200).json(stadiums);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Add a StadiumStyle to a specific Stadium
  addStadiumStyle: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Stadium ID:", id);
      const stadiumStyle = req.body;

      const stadium = await Stadium.findById(id);
      if (!stadium) {
        return res.status(404).json("Stadium not found");
      }

      stadium.stadium_styles.push(stadiumStyle);
      const updatedStadium = await stadium.save();
      return res.status(200).json(updatedStadium);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllStadiumStyle: async (req, res) => {
    try {
      const { id } = req.params;
      const stadium = await Stadium.findById(id);
      if (!stadium) {
        return res.status(404).json({ message: "Không tìm thấy sân vận động" });
      }
      return res.status(200).json({
        stadium_styles: stadium.stadium_styles,
        stadium_name: stadium.stadium_name,
        address: stadium.address,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getAnStadiumStyle: async (req, res) => {
    try {
      const { id, idStadiumStyle } = req.params;
      const stadium = await Stadium.findById(id);
      const style = stadium.stadium_styles.id(idStadiumStyle);
      return res.status(200).json({
        stadium_style: style,
        stadium_name: stadium.stadium_name,
        address: stadium.address,
        phone: stadium.phone,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateStadiumStyle: async (req, res) => {
    try {
      const { id, stadiumStyleId } = req.params;
      const updatedData = req.body;

      const stadium = await Stadium.findById(id);
      if (!stadium) {
        return res.status(404).json("Stadium not found");
      }

      const style = stadium.stadium_styles.id(stadiumStyleId);
      if (!style) {
        return res.status(404).json("StadiumStyle not found");
      }

      // Cập nhật các trường của stadiumStyle
      style.set(updatedData);

      await stadium.save();
      return res.status(200).json(style);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deleteStadiumStyle: async (req, res) => {
    try {
      const { stadiumStyleId } = req.params;

      const stadium = await Stadium.find({
        stadium_styles: { $elemMatch: { _id: stadiumStyleId } },
      });

      if (stadium.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Sân không tồn tại" });
      }
      await Stadium.updateOne(
        { "stadium_styles._id": stadiumStyleId },
        { $pull: { stadium_styles: { _id: stadiumStyleId } } }
      );

      return res.status(200).json({ success: true, message: "Xóa thành công" });
    } catch (err) {
      console.error(`Error occurred: ${err}`);
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = stadiumController;
