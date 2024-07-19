const BookPitch = require("../model/bookPitch");
const moment = require("moment-timezone");
const bookPitchController = {
  bookPitch: async (req, res) => {
    try {
      const { phone, startTime, endTime } = req.body;

      if (!phone || !startTime || !endTime) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng điền đầy đủ thông tin",
        });
      }

      if (endTime < startTime) {
        return res.status(400).json({
          success: false,
          message: "Thời  gian kết thúc phải sau thời gian bắt đầu",
        });
      }

      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: "Số điện thoại không hợp lệ" });
      }

      const overlappingBookings = await BookPitch.find({
        $or: [
          {
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
          },
        ],
      });

      if (overlappingBookings.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Khung giờ này đã có người đặt",
        });
      }

      const newBooking = await BookPitch.create({
        phone: phone,
        startTime: startTime,
        endTime: endTime,
        user: req.customer.id,
      });

      const bookingWithUser = await BookPitch.findById(newBooking._id).populate(
        "user"
      );
      const username = bookingWithUser.user.username;

      const timeZone = "Asia/Ho_Chi_Minh";
      const formattedStartTime = moment(newBooking.startTime)
        .tz(timeZone)
        .format("YYYY/MM/DD HH:mm");
      const formattedEndTime = moment(newBooking.endTime)
        .tz(timeZone)
        .format("YYYY/MM/DD HH:mm");

      return res.status(200).json({
        success: true,
        data: {
          ...newBooking._doc,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          username: username,
          status: "confirmed",
        },
      });
    } catch (error) {
      console.log("🚀 ~ bookPitch: ~ error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllBookPitches: async (req, res) => {
    try {
      const bookPitches = await BookPitch.find().populate({
        path: "user",
        select: "username",
      });
      return res.status(200).json(bookPitches);
    } catch (err) {
      console.log("🚀 ~ getAllBookPitches: ~ err:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};

module.exports = bookPitchController;
