const BookPitch = require("../model/bookPitch");
const moment = require("moment-timezone");
const cron = require('node-cron');
const { Stadium } = require("../model/stadium");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bookPitchController = {
  bookPitch: async (req, res) => {
    try {
      const { phone, startTime, endTime } = req.body;

      if (!phone || !startTime || !endTime) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin',
        });
      }

      if (endTime < startTime) {
        return res.status(400).json({
          success: false,
          message: 'Thời  gian kết thúc phải sau thời gian bắt đầu',

        });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: 'Số điện thoại không hợp lệ' });
      }

      const { stadiumID, stadiumStyleID } = req.params;
      const stadium = await Stadium.findById(stadiumID);
      const style = stadium.stadium_styles.id(stadiumStyleID);

      const overlappingBooking = await BookPitch.find({
        stadium: stadiumID,
        stadiumStyle: stadiumStyleID,
        $or: [
          { startTime: { $lt: endTime, $gt: startTime } },
          { endTime: { $gt: startTime, $lt: endTime } },
          { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
        ],
      });

      if (overlappingBooking.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Khung giờ này đã có người đặt',
         
        });
      }
      const newBooking = await BookPitch.create({
        phone: phone,
        startTime: startTime,
        endTime: endTime,
        user: req.customer.id,
        stadium: stadiumID,
        stadiumStyle: stadiumStyleID,
        status: "confirmed",
      });

      const bookingWithUser = await BookPitch.findById(newBooking._id).populate(
        'user',
      );
      const username = bookingWithUser.user.username;

      const timeZone = 'Asia/Ho_Chi_Minh';
      const formattedStartTime = moment(newBooking.startTime)
        .tz(timeZone)
        .format('YYYY/MM/DD HH:mm');
      const formattedEndTime = moment(newBooking.endTime)
        .tz(timeZone)
        .format('YYYY/MM/DD HH:mm');

      return res.status(200).json({
        success: true,
        data: {
          ...newBooking._doc,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          username: username,
          status: 'confirmed',
          stadium: {
            _id: stadium._id,
            stadium_name: stadium.stadium_name,
            image: stadium.image,
            ward: stadium.ward,
            city: stadium.city,
            provice: stadium.provice,
            describe: stadium.describe,
            phone: stadium.phone,
            stadium_style: style,
          },
        },
      });
    } catch (error) {
      console.log('🚀 ~ bookPitch: ~ error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllBookPitches: async (req, res) => {
    try {
      const bookPitches = await BookPitch.find().populate({
        path: 'user',
        select: 'username',
      });
      const data = [];
      for (let i = 0; i < bookPitches.length; i++) {
        let stadiumStyleId = bookPitches[i].stadiumStyle;

        const stadium = await Stadium.findOne({
          "stadium_styles._id": stadiumStyleId,
        });
        // console.log(stadium);
        const st = stadium.stadium_styles.find(
          (style) => style._id.toString() === stadiumStyleId.toString()
        );
        let oject = {};
        // stadium(...datas, stadium_styles)._doc;
        const { stadium_styles, ...datas } = stadium._doc;
        oject = {
          ...datas,
          ...st._doc,
          ...bookPitches[i]._doc,
        };
        data.push(oject);
      }

      return res.status(200).json(data);
    } catch (err) {
      console.log('🚀 ~ getAllBookPitches: ~ err:', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  getAnBookPitches: async (req, res) => {
    try {
      // Tìm kiếm thông tin đặt sân theo ID từ tham số của request
      const bookPitch = await BookPitch.findById(req.params.id).populate({
        path: 'user',
        select: 'username',
      });
  
      // Nếu không tìm thấy đặt sân, trả về mã lỗi 404 và thông báo
      if (!bookPitch) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thông tin đặt sân',
        });
      }
  
      // Tìm kiếm sân vận động có kiểu sân tương ứng với ID của đặt sân
      const stadium = await Stadium.findOne({
        "stadium_styles._id": bookPitch.stadiumStyle,
      });
  
      // Nếu không tìm thấy sân vận động, trả về mã lỗi 404 và thông báo
      if (!stadium) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sân vận động với kiểu sân này',
        });
      }
  
      // Tìm kiểu sân cụ thể trong danh sách các kiểu sân của sân vận động
      const style = stadium.stadium_styles.id(bookPitch.stadiumStyle);
  
      // Nếu không tìm thấy kiểu sân, trả về mã lỗi 404 và thông báo
      if (!style) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy kiểu sân với ID này',
        });
      }
  
      // Tách thuộc tính stadium_styles ra khỏi dữ liệu sân vận động
      const { stadium_styles, ...stadiumData } = stadium._doc;
  
      // Tạo đối tượng phản hồi kết hợp thông tin từ sân vận động, kiểu sân, và đặt sân
      const responseData = {
        ...stadiumData,
        ...style._doc,
        ...bookPitch._doc,
      };
  
      // Trả về mã thành công 200 và dữ liệu kết hợp
      return res.status(200).json({
        success: true,
        data: responseData,
      });
    } catch (error) {
      // Xử lý lỗi và trả về mã lỗi 500 với thông báo lỗi
      console.log('🚀 ~ getAnBookPitches: ~ error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  
  
  deleteBookPitchs: async(req,res) => {
   try {
     await BookPitch.findByIdAndDelete(req.params.id)
     return res.status(200).json("Xóa lịch thành công");
   } catch (error) {
      console.log("🚀 ~ deleteBookPitchs:async ~ error:", error);    
      return res.status(500).json(error);
   }
  },

  weeklyBooking: async (req, res) => {
    try {
      const { phone, startTime, endTime, repeatInterval } = req.body;
      if (!phone || !startTime || !endTime || !repeatInterval) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin',
        });
      }

      if (endTime < startTime) {
        return res.status(400).json({
          success: false,
          message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
        });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ success: false, message: 'Số điện thoại không hợp lệ' });
      }

      const { stadiumID, stadiumStyleID } = req.params;
      const stadium = await Stadium.findById(stadiumID);
      const style = stadium.stadium_styles.id(stadiumStyleID);

      const now = new Date();
      let currentStartTime = new Date(startTime);
      let currentEndTime = new Date(endTime);

      while (currentStartTime.getMonth() === now.getMonth()) {
        // Kiểm tra chồng chéo lịch đặt
        const overlappingBooking = await BookPitch.find({
          stadium: stadiumID,
          stadiumStyle: stadiumStyleID,
          startTime: { $lt: currentEndTime },
          endTime: { $gt: currentStartTime },
        });

        if (overlappingBooking.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Khung giờ này đã có người đặt',
          });
        }

        await BookPitch.create({
          phone: phone,
          startTime: currentStartTime,
          endTime: currentEndTime,
          user: req.customer.id,
          stadium: stadiumID,
          stadiumStyle: stadiumStyleID,
          status: "confirmed",
          repeat: true,
          repeatInterval: repeatInterval,
        });

        // Di chuyển thời gian đến tuần tiếp theo
        currentStartTime.setDate(currentStartTime.getDate() + repeatInterval * 7);
        currentEndTime.setDate(currentEndTime.getDate() + repeatInterval * 7);
      }

      return res.status(200).json({
        success: true,
        message: 'Đặt sân hàng tuần trong tháng thành công',
      });
    } catch (error) {
      console.log('🚀 ~ weeklyBooking: ~ error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  monthlyBooking: async (req, res) => {
    try {
      const { phone, startTime, endTime, repeatInterval } = req.body;
      if (!phone || !startTime || !endTime || !repeatInterval) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin',
        });
      }

      if (endTime < startTime) {
        return res.status(400).json({
          success: false,
          message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
        });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ success: false, message: 'Số điện thoại không hợp lệ' });
      }

      const { stadiumID, stadiumStyleID } = req.params;
      const stadium = await Stadium.findById(stadiumID);
      const style = stadium.stadium_styles.id(stadiumStyleID);

      const now = new Date();
      let currentStartTime = new Date(startTime);
      let currentEndTime = new Date(endTime);

      while (currentStartTime.getFullYear() === now.getFullYear()) {
        // Kiểm tra chồng chéo lịch đặt
        const overlappingBooking = await BookPitch.find({
          stadium: stadiumID,
          stadiumStyle: stadiumStyleID,
          startTime: { $lt: currentEndTime },
          endTime: { $gt: currentStartTime },
        });

        if (overlappingBooking.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Khung giờ này đã có người đặt',
          });
        }

        await BookPitch.create({
          phone: phone,
          startTime: currentStartTime,
          endTime: currentEndTime,
          user: req.customer.id,
          stadium: stadiumID,
          stadiumStyle: stadiumStyleID,
          status: "confirmed",
          repeat: true,
          repeatInterval: repeatInterval,
        });

        // Di chuyển thời gian đến tháng tiếp theo
        currentStartTime.setMonth(currentStartTime.getMonth() + repeatInterval);
        currentEndTime.setMonth(currentEndTime.getMonth() + repeatInterval);
      }

      return res.status(200).json({
        success: true,
        message: 'Đặt sân hàng tháng trong năm thành công',
      });
    } catch (error) {
      console.log('🚀 ~ monthlyBooking: ~ error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  
};
// Lên lịch tự động xóa các đặt sân đã hết hạn

cron.schedule('0 0 * * *', async () => { 
  try {
    const now = new Date();
    //const fourMinutesAgo = new Date(now.getTime() - 4 * 60 * 1000); // 4 phút trước thời điểm hiện tại

    // Xóa các bản ghi có endTime nhỏ hơn bốn phút trước thời điểm hiện tại
    await BookPitch.deleteMany({ endTime: { $lt: now } });

    console.log('Đã xóa các đặt sân đã hết hạn sau 4 phút.');
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa các đặt sân đã hết hạn:', error);
  }
});



module.exports = bookPitchController;