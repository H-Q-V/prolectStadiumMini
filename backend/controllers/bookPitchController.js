const BookPitch = require('../model/bookPitch');
const moment = require('moment-timezone');
const cron = require('node-cron');
const { Stadium } = require('../model/stadium');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const bookPitchController = {

bookPitch: async (req, res) => {
  try {
      let { phone, startTime, endTime, bookingType, weeksToBook, monthsToBook } = req.body;
      const { stadiumID, stadiumStyleID } = req.params;

      if (!phone || !startTime || !endTime) {
          return res.status(400).json({
              success: false,
              message: "Vui lòng điền đầy đủ thông tin",
          });
      }

      if (endTime < startTime) {
          return res.status(400).json({
              success: false,
              message: "Thời gian kết thúc phải sau thời gian bắt đầu",
          });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
          return res.status(400).json({
              success: false,
              message: "Số điện thoại không hợp lệ",
          });
      }

      const stadium = await Stadium.findById(stadiumID);
      if (!stadium) {
          return res.status(404).json({
              success: false,
              message: "Không tìm thấy sân",
          });
      }

      const style = stadium.stadium_styles.id(stadiumStyleID);
      if (!style) {
          return res.status(404).json({
              success: false,
              message: "Không tìm thấy kiểu sân",
          });
      }

      const isOverlapping = async (timeSlots) => {
          const overlappingBookings = await BookPitch.find({
              stadium: stadiumID,
              stadiumStyle: stadiumStyleID,
              $or: timeSlots.map(({ startTime, endTime }) => ({
                  $or: [
                      { 'time.startTime': { $lt: endTime, $gt: startTime } },
                      { 'time.endTime': { $gt: startTime, $lt: endTime } },
                      { 'time.startTime': { $lte: startTime }, 'time.endTime': { $gte: endTime } },
                  ],
              })),
          });
          return overlappingBookings.length > 0;
      };

      const createBooking = async (timeSlots) => {
          return await BookPitch.create({
              phone: phone,
              time: timeSlots,
              user: req.customer.id,
              stadium: stadiumID,
              stadiumStyle: stadiumStyleID,
              status: 'confirmed',
              originalStartTime: new Date(startTime),
              originalEndTime: new Date(endTime),
          });
      };

      const handleBooking = async (timeSlots) => {
          if (await isOverlapping(timeSlots)) {
              return res.status(400).json({
                  success: false,
                  message: 'Khung giờ này đã có người đặt',
              });
          }
          const newBooking = await createBooking(timeSlots);
          return res.status(200).json({
              success: true,
              data: newBooking,
          });
      };

      const processBooking = async () => {
          let timeSlots = [];
          switch (bookingType || 'ngày') {  // Mặc định là 'ngày' nếu không có bookingType
              case 'ngày':
                  timeSlots.push({ startTime: new Date(startTime), endTime: new Date(endTime) });
                  break;
              case 'hàng tuần':
                  if (!weeksToBook) {
                      return res.status(400).json({
                          success: false,
                          message: 'Ngày để đặt tuần không hợp lệ.',
                      });
                  }
                  let currentStart = moment.tz(startTime, 'Asia/Ho_Chi_Minh');
                  const endDate = moment.tz(weeksToBook, 'Asia/Ho_Chi_Minh');
                  while (currentStart.isBefore(endDate)) {
                      let currentEnd = moment.tz(endTime, 'Asia/Ho_Chi_Minh').year(currentStart.year()).week(currentStart.week());
                      timeSlots.push({ startTime: currentStart.toDate(), endTime: currentEnd.toDate() });
                      currentStart.add(1, 'week');
                  }
                  break;
              case 'hàng tháng':
                  if (!monthsToBook) {
                      return res.status(400).json({
                          success: false,
                          message: 'Danh sách tháng để đặt không hợp lệ.',
                      });
                  }
                  let startMonth = moment.tz(startTime, 'Asia/Ho_Chi_Minh');
                  let endMonth = moment.tz(monthsToBook, 'Asia/Ho_Chi_Minh');
                  while (startMonth.isBefore(endMonth) || startMonth.isSame(endMonth, 'month')) {
                      let monthEnd = moment(startMonth).set({
                          'hour': moment(endTime).hour(),
                          'minute': moment(endTime).minute(),
                          'second': moment(endTime).second()
                      });
                      timeSlots.push({ startTime: startMonth.toDate(), endTime: monthEnd.toDate() });
                      startMonth.add(1, 'month');
                  }
                  break;
              default:
                  return res.status(400).json({
                      success: false,
                      message: 'Loại đặt sân không hợp lệ.',
                  });
          }
          await handleBooking(timeSlots);
      };

      await processBooking();
  } catch (error) {
      console.log('🚀 ~ bookPitch: ~ error:', error);
      return res.status(500).json({ success: false, message: error.message });
  }
},

  getAllBookPitches: async (req, res) => {
    try {
      const bookPitches = await BookPitch.find().populate({
        path: "user",
        select: "username",

      });
      const data = [];
      for (let i = 0; i < bookPitches.length; i++) {
        let stadiumStyleId = bookPitches[i].stadiumStyle;

        const stadium = await Stadium.findOne({
          'stadium_styles._id': stadiumStyleId,
        });
        const st = stadium.stadium_styles.find(
          (style) => style._id.toString() === stadiumStyleId.toString(),
        );
        let object = {};
        const { stadium_styles, ...datas } = stadium._doc;
  
        object = {
          ...datas,
          ...st._doc,
          ...bookPitches[i]._doc,
          time: bookPitches[i].time.map(slot => ({
            startTime: moment(slot.startTime).tz('Asia/Ho_Chi_Minh').format(), // Chuyển đổi startTime sang UTC+7
            endTime: moment(slot.endTime).tz('Asia/Ho_Chi_Minh').format()    // Chuyển đổi endTime sang UTC+7
          }))
        };
        data.push(object);
      }

      return res.status(200).json(data);
    } catch (err) {
      console.log("🚀 ~ getAllBookPitches: ~ err:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  getCustomerBookPitches: async (req, res) => {
    try {
      const bookPitch = await BookPitch.find({
        user: req.customer.id,
      });

      const data = [];
      for (let i = 0; i < bookPitch.length; i++) {
        let stadiumStyleId = bookPitch[i].stadiumStyle;

        const stadium = await Stadium.findOne({
          "stadium_styles._id": stadiumStyleId,
        });
        const st = stadium.stadium_styles.find(
          (style) => style._id.toString() === stadiumStyleId.toString()
        );
        let oject = {};
        const { stadium_styles, ...datas } = stadium._doc;

        const convertedTimeSlots = bookPitch[i].time.map(slot => ({
          startTime: moment.utc(slot.startTime).tz('Asia/Ho_Chi_Minh').format(),
          endTime: moment.utc(slot.endTime).tz('Asia/Ho_Chi_Minh').format(),
         }));

        oject = {
          ...datas,
          ...st._doc,
          ...bookPitch[i]._doc,
          time: convertedTimeSlots, // Cập nhật thời gian đã chuyển đổi
          originalStartTime: moment.utc(bookPitch[i].originalStartTime).tz('Asia/Ho_Chi_Minh').format(),
          originalEndTime: moment.utc(bookPitch[i].originalEndTime).tz('Asia/Ho_Chi_Minh').format(),
        };
        data.push(oject);
      }

      return res.status(200).json({ success: true, message: data });
    } catch (error) {
      console.log("🚀 ~ getAnBookPitches: ~ error:", error);
      return res.status(500).json(error);
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

      const booking = await BookPitch.findById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đặt sân',
        });
      }

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

      booking.phone = phone;
      booking.startTime = new Date(startTime);
      booking.endTime = new Date(endTime);

      await booking.save();

      return res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      console.log('🚀 ~ updateBookPitch: ~ error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  payBookPitches: async(req,res) => {
      try {
        const {id} = req.params;
        const pay = await BookPitch.findById()
      } catch (error) {
        return res.status(500).json({success: false, message: error.message});
      }
  },

};


cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  try {
    const bookings = await BookPitch.find({});
    for (let booking of bookings) {
      const updatedTimeSlots = booking.time.filter(slot => new Date(slot.endTime) >= now);
      if (updatedTimeSlots.length > 0) {
        await BookPitch.findByIdAndUpdate(booking._id, { time: updatedTimeSlots });
      } else {
        await BookPitch.findByIdAndDelete(booking._id);
      }
    }

    console.log('Đã xóa các đặt sân và phần tử đã hết hạn thành công.');
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa các đặt sân và phần tử đã hết hạn:', error);
  }
});


module.exports = bookPitchController;
