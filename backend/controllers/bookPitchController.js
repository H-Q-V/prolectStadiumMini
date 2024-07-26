const BookPitch = require('../model/bookPitch');
const moment = require('moment-timezone');
const cron = require('node-cron');
const { Stadium } = require('../model/stadium');
const mongoose = require('mongoose');
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
        status: 'confirmed',
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
          'stadium_styles._id': stadiumStyleId,
        });
        // console.log(stadium);
        const st = stadium.stadium_styles.find(
          (style) => style._id.toString() === stadiumStyleId.toString(),
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
        'stadium_styles._id': bookPitch.stadiumStyle,
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

  deleteBookPitchs: async (req, res) => {
    try {
      await BookPitch.findByIdAndDelete(req.params.id);
      return res.status(200).json('Xóa lịch thành công');
    } catch (error) {
      console.log('🚀 ~ deleteBookPitchs:async ~ error:', error);
      return res.status(500).json(error);
    }
  },

  updateBookPitch: async (req, res) => {
    try {
      const { phone, startTime, endTime} = req.body;
      const { id } = req.params;

      // Kiểm tra tính hợp lệ của thông tin đầu vào

      if (new Date(endTime) <= new Date(startTime)) {
        return res.status(400).json({
          success: false,
          message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
        });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          message: 'Số điện thoại không hợp lệ',
        });
      }

      // Tìm đặt sân theo ID
      const booking = await BookPitch.findById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đặt sân',
        });
      }

      // Kiểm tra xung đột với các đặt sân khác
      const overlappingBooking = await BookPitch.find({
        stadium: booking.stadium,
        stadiumStyle: booking.stadiumStyle,
        _id: { $ne: id }, // Loại trừ đặt sân hiện tại
        $or: [
          { startTime: { $lt: new Date(endTime), $gt: new Date(startTime) } },
          { endTime: { $gt: new Date(startTime), $lt: new Date(endTime) } },
          { startTime: { $lte: new Date(startTime) }, endTime: { $gte: new Date(endTime) } },
        ],
      });

      if (overlappingBooking.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Khung giờ này đã có người đặt',
        });
      }

      // Cập nhật thông tin đặt sân
      booking.phone = phone;
      booking.startTime = new Date(startTime);
      booking.endTime = new Date(endTime);
      //booking.status = status;

      // Lưu thay đổi
      await booking.save();

      // Trả về thông tin cập nhật thành công
      return res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      console.log('🚀 ~ updateBookPitch: ~ error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  weeklyBooking: async (req, res) => {
    try {
      const { phone, startTime, endTime, weeksToBook } = req.body;
      const { stadiumID, stadiumStyleID } = req.params;
      const scheduledJobs = {};
      
      for(let dayweek of weeksToBook){
        if(dayweek > 4 || dayweek < 1){
          return res.status(400).json({
            sussess: false,
            message: 'Nhập sai tuần ' + dayweek,
          })
         }
      }

      
      if (!phone || !startTime || !endTime || !weeksToBook) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin',
        });
      }

      const jobId = `${stadiumID}-${stadiumStyleID}`;

      // Kiểm tra và hủy bỏ cronjob hiện có nếu cần
      if (scheduledJobs[jobId]) {
        scheduledJobs[jobId].stop();
        delete scheduledJobs[jobId];
      }

      // Định nghĩa hàm để thực hiện việc đặt sân hàng tuần
      const bookPitchWeekly = async () => {
        try {
          const currentWeekOfMonth = Math.ceil(moment().date() / 7);

          if (!weeksToBook.includes(currentWeekOfMonth)) {
            console.log(
              `Tuần ${currentWeekOfMonth} không nằm trong danh sách đặt sân.`,
            );
            return;
          }

          const startTimeMoment = moment.tz(startTime, 'Asia/Ho_Chi_Minh');
          const endTimeMoment = moment.tz(endTime, 'Asia/Ho_Chi_Minh');

          const overlappingBooking = await BookPitch.find({
            stadium: stadiumID,
            stadiumStyle: stadiumStyleID,
            $or: [
              {
                startTime: {
                  $lt: endTimeMoment.toDate(),
                  $gt: startTimeMoment.toDate(),
                },
              },
              {
                endTime: {
                  $gt: startTimeMoment.toDate(),
                  $lt: endTimeMoment.toDate(),
                },
              },
              {
                startTime: { $lte: startTimeMoment.toDate() },
                endTime: { $gte: endTimeMoment.toDate() },
              },
            ],
          });

          if (overlappingBooking.length > 0) {
            console.log('Khung giờ này đã có người đặt');
            return;
          }

          const newBooking = await BookPitch.create({
            phone: phone,
            startTime: startTimeMoment.toDate(),
            endTime: endTimeMoment.toDate(),
            user: req.customer.id, // Thay đổi ID người dùng theo yêu cầu
            stadium: stadiumID,
            stadiumStyle: stadiumStyleID,
            status: 'confirmed',
          });

          console.log('Đặt sân thành công:', newBooking);
        } catch (error) {
          console.log('🚀 ~ bookPitchWeekly: ~ error:', error);
        }
      };

      scheduledJobs[jobId] = cron.schedule('1 * * * * *', bookPitchWeekly);

      return res.status(200).json({
        success: true,
        message: 'Cronjob đặt sân hàng tuần đã được thiết lập.',
      });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
  },

  monthlyBooking: async (req, res) => {
    try {
      const { phone, startTime, endTime, datesToBook, monthsToBook } = req.body;
      const { stadiumID, stadiumStyleID } = req.params;
      const scheduledJobs = {};

      for(let date of datesToBook){
          if(date > 31 || date < 1){
            return res.status(400).json({
              success: false,
              message: "Nhập sai ngày",
            })
          }
      }

      for (let month of monthsToBook) {
        if(month > 12 || month < 1){
          return res.status(400).json({
            success: false,
            message: "Nhập sai tháng",
          })
        }
      }

      if (!phone || !startTime || !endTime || !datesToBook || !monthsToBook) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin',
        });
      }
  
      const jobId = `${stadiumID}-${stadiumStyleID}`;
  
      if (scheduledJobs[jobId]) {
        scheduledJobs[jobId].stop();
        delete scheduledJobs[jobId];
      }
  
      const bookPitchMonthly = async () => {
        try {
          const currentDate = moment().date();
          const currentMonth = moment().month() + 1; 
  
          if (!datesToBook.includes(currentDate) || !monthsToBook.includes(currentMonth)) {
            console.log(`Ngày ${currentDate} hoặc tháng ${currentMonth} không nằm trong danh sách đặt sân.`);
            return;
          }
  
          const startTimeMoment = moment.tz(startTime, 'Asia/Ho_Chi_Minh');
          const endTimeMoment = moment.tz(endTime, 'Asia/Ho_Chi_Minh');
  
          const overlappingBooking = await BookPitch.find({
            stadium: stadiumID,
            stadiumStyle: stadiumStyleID,
            $or: [
              { startTime: { $lt: endTimeMoment.toDate(), $gt: startTimeMoment.toDate() } },
              { endTime: { $gt: startTimeMoment.toDate(), $lt: endTimeMoment.toDate() } },
              { startTime: { $lte: startTimeMoment.toDate() }, endTime: { $gte: endTimeMoment.toDate() } },
            ],
          });
  
          if (overlappingBooking.length > 0) {
            console.log('Khung giờ này đã có người đặt');
            return;
          }
  
          const newBooking = await BookPitch.create({
            phone: phone,
            startTime: startTimeMoment.toDate(),
            endTime: endTimeMoment.toDate(),
            user: req.customer.id,
            stadium: stadiumID,
            stadiumStyle: stadiumStyleID,
            status: "confirmed",
          });
  
          console.log('Đặt sân thành công:', newBooking);
        } catch (error) {
          console.log('🚀 ~ bookPitchMonthly: ~ error:', error);
        }
      };
  
      scheduledJobs[jobId] = cron.schedule('0 0 1 * *', bookPitchMonthly);
  
      return res.status(200).json({
        success: true,
        message: 'Cronjob đặt sân hàng tháng đã được thiết lập.',
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  
};


cron.schedule('1 * * * * *', async () => {
  try {
    const now = new Date();
    await BookPitch.deleteMany({ endTime: { $lt: now } });
    console.log('Đã xóa các đặt sân đã hết hạn.');
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa các đặt sân đã hết hạn:', error);
  }
});

module.exports = bookPitchController;
