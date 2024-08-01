const { Stadium } = require('../model/stadium');
const {
  uploadImage,
  deleteImage,
  imageUpdater,
} = require('../uploadImage/uploadImage');

const stadiumController = {
  addStadium: async (req, res) => {
    try {
      console.log('Request body:', req.body);

      const {
        stadium_name,
        ward,
        city,
        provice,
        phone,
        image,
        describe,
        stadium_styles,
        stadium_owner,
      } = req.body;

      if (!stadium_name || !ward || !city || !provice || !phone) {
        return res
          .status(400)
          .json({ status: false, message: 'Vui lòng điền đầy đủ thông tin' });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: 'Số điện thoại không hợp lệ' });
      }

      const uploadedImage = await uploadImage(image);
      console.log('Uploaded image:', uploadedImage);

      const response = await Stadium.create({
        image: uploadedImage.secure_url,
        stadium_name: stadium_name,
        ward: ward,
        city: city,
        provice: provice,
        describe: describe,
        stadium_styles: stadium_styles,
        stadium_owner: stadium_owner,
        phone: phone,
      });
      return res.json({ success: true, data: response });
    } catch (err) {
      console.log('🚀 ~ addStadium: ~ err:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Error create stadium' });
    }
  },

  // Get all stadiums
  getAllStadium: async (req, res) => {
    try {
      const stadiums = await Stadium.find({}).populate('stadium_owner');
      return res.json({ data: stadiums });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get a specific stadium
  getAnStadium: async (req, res) => {
    try {
      const { id } = req.params;
      const stadium = await Stadium.findById(id).populate('stadium_owner');
      return res.status(200).json(stadium);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Update a stadium
  updateStadium: async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.id);
      //const {stadium_name, address, image, phone, describe} = req.body
      const updates = {};
      const { stadium_name, ward, city, provice, phone, image, describe } =
        req.body;
      const phoneRegex = /^[0-9]{10}$/;
      if (phone && !phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: 'Nhập sai thông tin' });
      }

      if (stadium_name) {
        updates.stadium_name = stadium_name;
      }
      if (ward) {
        updates.ward = ward;
      }
      if (provice) {
        updates.provice = provice;
      }
      if (city) {
        updates.city = city;
      }
      // Xử lý hình ảnh
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
          .json({ status: false, message: 'Không có dữ liệu được cập nhật' });
      }

      await stadium.updateOne({ $set: updates });
      return res
        .status(200)
        .json({ status: true, message: 'Updated successfully' });
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
          .json({ success: false, message: 'Sân không tồn tại' });
      }
      await deleteImage(stadium.image);

      await Stadium.findByIdAndDelete(req.params.id);
      return res.status(200).json('Deleted successfully');
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  searchStadium: async (req, res) => {
    try {
      const { search, ward, city, provice } = req.query;
      let queries = [];
      if (search) {
        queries.push({
          $or: [
            { stadium_name: { $regex: search, $options: 'i' } },
            { provice: { $regex: search, $options: 'i' } },
          ],
        });
      }
      if (ward) {
        queries.push({ ward: { $regex: ward, $options: 'i' } });
      }
      if (city) {
        queries.push({ city: { $regex: city, $options: 'i' } });
      }
      if (provice) {
        queries.push({ provice: { $regex: provice, $options: 'i' } });
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
        image: 1,
        phone: 1,
        stadium_styles: 1,
        stadium_owner: 1,
      };
      //const stadiums = await Stadium.find(query, projection);
      const stadiums = await Stadium.find(query, projection).populate(
        'stadium_owner',
      );
      return res.status(200).json(stadiums);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Add a StadiumStyle to a specific Stadium
  addStadiumStyle: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Stadium ID:', id);
      // const stadiumStyle = req.body;
      const { name, type, image, price } = req.body;
      if (!name || !type || !price) {
        return res
          .status(500)
          .json({ status: false, message: 'Nhập sai thông tin' });
      }
      const priceRegex = /^\d+$/;
      if (!priceRegex.test(price)) {
        return res
          .status(401)
          .json({ status: false, message: 'Nhập sai giá tiền' });
      }

      const uploadedImage = await uploadImage(image);

      const formattedPrice = parseFloat(price).toLocaleString('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      const stadium = await Stadium.findById(id);
      if (!stadium) {
        return res.status(404).json('Stadium not found');
      }
      const stadiumStyle = {
        name: name,
        type: type,
        image: uploadedImage.secure_url,
        price: formattedPrice,
      };
      console.log('Uploaded image:', uploadedImage);

      stadium.stadium_styles.push(stadiumStyle);
      const updatedStadium = await stadium.save();
      return res.status(200).json({ status: true, data: updatedStadium });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Thêm thông tin thất bại' });
    }
  },

  getAllStadiumStyle: async (req, res) => {
    try {
      const { id } = req.params;
      const stadium = await Stadium.findById(id);
      if (!stadium) {
        return res.status(404).json({ message: 'Không tìm thấy sân vận động' });
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
      //const updatedData = req.body;
      const update = {};
      const { name, type, image, price } = req.body;
      if (name) {
        update.name = name;
      }
      if (type) {
        update.type = type;
      }

      if (price) {
        const priceRegex = /^\d+$/;
        if (!priceRegex.test(price)) {
          return res
            .status(401)
            .json({ status: false, message: 'Nhập sai giá tiền' });
        }
        const formattedPrice = parseFloat(price).toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        update.price = formattedPrice;
      }
      const stadium = await Stadium.findById(id);

      if (!stadium) {
        return res.status(404).json('Stadium not found');
      }

      const style = stadium.stadium_styles.id(stadiumStyleId);
      if (!style) {
        return res.status(404).json('StadiumStyle not found');
      }
      if (image) {
        const updateimage = await imageUpdater(style.image, image);
        //console.log("a",style.image);
        //console.log("b", image);
        update.image = updateimage.secure_url;
      }

      // Cập nhật các trường của stadiumStyle
      style.set(update);
      await stadium.save();
      return res.status(200).json(style);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deleteStadiumStyle: async (req, res) => {
    try {
      const { stadiumStyleId } = req.params;

      const stadium = await Stadium.findOne({
        'stadium_styles._id': stadiumStyleId,
      });

      if (!stadium) {
        return res
          .status(404)
          .json({ error: 'Sân vận động không tồn tại' });
      }

      const stadiumStyle = stadium.stadium_styles.id(stadiumStyleId);

      if (!stadiumStyle) {
        return res
          .status(404)
          .json({ error: 'Kiểu sân vận động không tồn tại' });
      }

      const publicId = stadiumStyle.image;

      if (publicId) {
        await deleteImage(publicId);
      }

      await Stadium.updateOne(
        { 'stadium_styles._id': stadiumStyleId },
        { $pull: { stadium_styles: { _id: stadiumStyleId } } },
      );

      return res.status(200).json({ success: true, message: 'Xóa thành công' });
    } catch (err) {
      console.error(`Error occurred: ${err}`);
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = stadiumController;
