const { Stadium } = require("../model/stadium");
const {
  uploadImage,
  deleteImage,
  imageUpdater,
} = require("../uploadImage/uploadImage");

const stadiumController = {
  addStadium: async (req, res) => {
    try {
      const {
        stadium_name,
        ward,
        city,
        provice,
        address, // Thêm trường address
        phone,
        image,
        describe,
        stadium_styles,
        stadium_owner,
      } = req.body;

      if (!stadium_name || !ward || !city || !provice || !address || !phone) {
        // Cập nhật kiểm tra
        return res
          .status(400)
          .json({ status: false, message: "Vui lòng điền đầy đủ thông tin" });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: "Số điện thoại không hợp lệ" });
      }

      const uploadedImage = await uploadImage(image);

      const response = await Stadium.create({
        image: uploadedImage.secure_url,
        stadium_name,
        ward,
        city,
        provice,
        address, // Thêm trường address
        describe,
        stadium_styles,
        stadium_owner: req.customer.id,
        phone,
      });
      return res.status(200).json({ success: true, data: response });
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

  updateStadium: async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.id);
      const updates = {};
      const {
        stadium_name,
        ward,
        city,
        provice,
        address,
        phone,
        image,
        describe,
      } = req.body;

      const phoneRegex = /^[0-9]{10}$/;
      if (phone && !phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: "Nhập sai thông tin" });
      }

      if (stadium_name) {
        updates.stadium_name = stadium_name;
      }
      if (ward) {
        updates.ward = ward;
      }
      if (city) {
        updates.city = city;
      }
      if (provice) {
        updates.provice = provice;
      }
      if (address) {
        // Thêm trường address
        updates.address = address;
      }
      if (image) {
        const updateimage = await imageUpdater(stadium.image, image);
        updates.image = updateimage.secure_url;
      }

      if (phone) {
        updates.phone = phone;
      }
      if (describe) {
        updates.describe = describe;
      }
      if (Object.keys(updates).length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Không có dữ liệu được cập nhật" });
      }

      await stadium.updateOne({ $set: updates });
      return res
        .status(200)
        .json({ status: true, message: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete a stadium
  deleteStadium: async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.id);
      if (!stadium) {
        return res
          .status(404)
          .json({ success: false, message: "Sân không tồn tại" });
      }
      await deleteImage(stadium.image);

      await Stadium.findByIdAndDelete(req.params.id);
      return res.status(200).json("Deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getAllStadiumsByOwner: async (req, res) => {
    try {
      const ownerID = req.customer.id;
      const stadiums = await Stadium.find({
        stadium_owner: ownerID,
      }).populate("stadium_owner");
      return res.json({ success: true, data: stadiums });
    } catch (error) {
      console.log("🚀 ~ getAllStadiumsByOwner: ~ error:", error);
      return res.status(500).json(error);
    }
  },

  searchStadium: async (req, res) => {
    try {
      const { search, ward, city, provice, address } = req.query;
      let queries = [];
      if (search) {
        queries.push({
          $or: [
            { stadium_name: { $regex: search, $options: "i" } },
            { provice: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { ward: { $regex: search, $options: "i" } },
          ],
        });
      }
      if (ward) {
        queries.push({ ward: { $regex: ward, $options: "i" } });
      }
      if (city) {
        queries.push({ city: { $regex: city, $options: "i" } });
      }
      if (provice) {
        queries.push({ provice: { $regex: provice, $options: "i" } });
      }
      if (address) {
        queries.push({ address: { $regex: address, $options: "i" } });
      }
      // Kết hợp các điều kiện tìm kiếm với $and
      const query = queries.length > 0 ? { $and: queries } : {};
      const projection = {
        _id: 1,
        stadium_name: 1,
        //address: 1,
        ward: 1,
        city: 1,
        provice: 1,
        address: 1,
        image: 1,
        phone: 1,
        stadium_styles: 1,
        stadium_owner: 1,
      };
      //const stadiums = await Stadium.find(query, projection);
      const stadiums = await Stadium.find(query, projection).populate(
        "stadium_owner"
      );
      if (stadiums.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Khồng tìm thấy thông tin sân",
        });
      }
      return res.status(200).json({ success: true, message: stadiums });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  addStadiumStyle: async (req, res) => {
    try {
      const id = req.customer.id;
      const { nameStadium } = req.body;
      const { name, type, price, time } = req.body;
      if (!name || !type || !price || !time) {
        return res
          .status(400)
          .json({ status: false, message: "Nhập thiếu thông tin" });
      }
      const priceRegex = /^\d+$/;
      if (!priceRegex.test(price)) {
        return res
          .status(400)
          .json({ status: false, message: "Nhập sai giá tiền" });
      }
      const formattedPrice = parseFloat(price).toLocaleString("vi-VN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      // Tìm stadium theo stadium_owner
      const stadium = await Stadium.findOne({
        stadium_name: nameStadium,
        stadium_owner: id,
      });
      if (!stadium) {
        return res
          .status(404)
          .json({ status: false, message: "Sân vận động không tìm thấy" });
      }
      const stadiumStyle = {
        name,
        type,
        price: formattedPrice,
        time,
      };
      stadium.stadium_styles.push(stadiumStyle);
      const updatedStadium = await stadium.save();
      return res.status(200).json({ status: true, data: updatedStadium });
    } catch (err) {
      console.error("Error occurred in addStadiumStyle:", err);
      return res
        .status(500)
        .json({ status: false, message: "Thêm thông tin thất bại" });
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
        _id: stadium._id,
        stadium_name: stadium.stadium_name,
        ward: stadium.ward,
        city: stadium.city,
        provice: stadium.provice,
        phone: stadium.phone,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateStadiumStyle: async (req, res) => {
    try {
      const id = req.customer.id;
      const { nameStadium, nameStadiumStyle, name, type, image, price, time } =
        req.body;
      const update = {};

      if (name) update.name = name;
      if (type) update.type = type;
      if (time) update.time = time;
      if (price) {
        const priceRegex = /^\d+$/;
        if (!priceRegex.test(price)) {
          return res
            .status(400)
            .json({ status: false, message: "Nhập sai giá tiền" });
        }
        const formattedPrice = parseFloat(price).toLocaleString("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        update.price = formattedPrice;
      }

      const stadium = await Stadium.findOne({
        stadium_name: nameStadium,
        stadium_owner: id,
      });
      if (!stadium) {
        return res
          .status(404)
          .json({ status: false, message: "Stadium not found" });
      }

      const style = stadium.stadium_styles.find(
        (style) => style.name === nameStadiumStyle
      );
      if (!style) {
        return res
          .status(404)
          .json({ status: false, message: "StadiumStyle not found" });
      }

      if (image) {
        const updateImage = await imageUpdater(style.image, image);
        if (!updateImage || !updateImage.secure_url) {
          return res
            .status(500)
            .json({ status: false, message: "Upload hình ảnh thất bại" });
        }
        update.image = updateImage.secure_url;
      }

      style.set(update);
      await stadium.save();
      return res.status(200).json({ status: true, data: style });
    } catch (err) {
      console.error("Error occurred in updateStadiumStyle:", err);
      return res
        .status(500)
        .json({ status: false, message: "Cập nhật thông tin thất bại" });
    }
  },

  deleteStadiumStyle: async (req, res) => {
    try {
      const { stadiumStyleId } = req.params;
      const stadium = await Stadium.findOne({
        "stadium_styles._id": stadiumStyleId,
      });
      if (!stadium) {
        return res.status(404).json({ error: "Sân vận động không tồn tại" });
      }
      const stadiumStyle = stadium.stadium_styles.id(stadiumStyleId);
      if (!stadiumStyle) {
        return res
          .status(404)
          .json({ error: "Kiểu sân vận động không tồn tại" });
      }
      const publicId = stadiumStyle.image;
      if (publicId) {
        await deleteImage(publicId);
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
