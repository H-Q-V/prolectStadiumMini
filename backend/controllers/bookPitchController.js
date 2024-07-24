const BookPitch = require("../model/bookPitch");
const moment = require("moment-timezone");
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
          message: "Khung giờ này đã có người đặt",
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
        "user"
      );
      console.log("🚀 ~ bookPitch: ~ bookingWithUser:", bookingWithUser);

      const username = bookingWithUser.username;
      console.log("🚀 ~ bookPitch: ~ username:", username);

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
      console.log("🚀 ~ getAllBookPitches: ~ err:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};

module.exports = bookPitchController;
