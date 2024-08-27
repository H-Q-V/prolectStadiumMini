const BookPitch = require("../model/bookPitch");
const moment = require("moment-timezone");
const { Stadium } = require("../model/stadium");
const bookPitchController = {
  bookPitch: async (req, res) => {
    try {
      const {
        phone,
        startTime,
        endTime,
        bookingType,
        note,
        timePeriodsToBook,
        isRecurring,
      } = req.body;
      const { stadiumID, stadiumStyleID } = req.params;

      if (!phone || !startTime || !endTime) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng điền đầy đủ thông tin",
        });
      }

      if (new Date(endTime) <= new Date(startTime)) {
        return res.status(400).json({
          success: false,
          message: "Thời gian kết thúc phải sau thời gian bắt đầu",
        });
      }

      if (new Date(endTime) < new Date() || new Date(startTime) < new Date()) {
        return res.status(400).json({
          success: false,
          message:
            "Thời gian đặt sân đã kết thúc, vui lòng chọn khung giờ khác",
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
              { "time.startTime": { $lt: endTime, $gt: startTime } },
              { "time.endTime": { $gt: startTime, $lt: endTime } },
              {
                "time.startTime": { $lte: startTime },
                "time.endTime": { $gte: endTime },
              },
            ],
          })),
        });
        return overlappingBookings.length > 0;
      };

      const calculateTotalAmount = async (timeSlots) => {
        let totalAmount = 0;
        for (let slot of timeSlots) {
          const pricePerSlot = parseFloat(style.price.replace(/\./g, ""));
          totalAmount += pricePerSlot;
        }
        return totalAmount;
      };

      const createBooking = async (timeSlots, totalAmount) => {
        const deposit = totalAmount * 0.15;

        const formattedtotalAmount = parseFloat(totalAmount).toLocaleString(
          "vi-VN",
          {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }
        );
        const formattedeposit = parseFloat(deposit).toLocaleString("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });

        const userID = req.customer.id;
        return await BookPitch.create({
          phone,
          totalAmount: formattedtotalAmount,
          deposit: formattedeposit,
          time: timeSlots,
          user: userID,
          stadium: stadiumID,
          stadiumStyle: stadiumStyleID,
          note: note,
          status: "pending",
          periodic: bookingType,
        });
      };
      const handleBooking = async (timeSlots) => {
        if (await isOverlapping(timeSlots)) {
          return res.status(400).json({
            success: false,
            message: "Khung giờ này đã có người đặt",
          });
        }

        const totalAmount = await calculateTotalAmount(timeSlots);

        const vietnamTimeSlots = timeSlots.map((slot) => ({
          startTime: moment
            .utc(slot.startTime)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY/MM/DD HH:mm"),
          endTime: moment
            .utc(slot.endTime)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY/MM/DD HH:mm"),
        }));

        const newBooking = await createBooking(vietnamTimeSlots, totalAmount);
        return res.status(200).json({
          success: true,
          data: vietnamTimeSlots,
        });
      };

      const processBooking = async () => {
        let timeSlots = [];

        if (!isRecurring || bookingType === "ngày") {
          const isoStartTime = moment(
            startTime,
            "DD/MM/YYYY HH:mm"
          ).toISOString();
          const isoEndTime = moment(endTime, "DD/MM/YYYY HH:mm").toISOString();

          timeSlots.push({
            startTime: isoStartTime,
            endTime: isoEndTime,
          });
        } else {
          switch (bookingType) {
            case "Hàng tuần":
              if (!timePeriodsToBook) {
                return res.status(400).json({
                  success: false,
                  message: "Ngày để đặt tuần không hợp lệ.",
                });
              }
              let currentStart = moment(startTime, "DD/MM/YYYY HH:mm");
              const endDate = moment(timePeriodsToBook, "DD/MM/YYYY HH:mm");
              while (currentStart.isBefore(endDate)) {
                let currentEnd = moment(currentStart)
                  .set({
                    hour: moment(endTime, "DD/MM/YYYY HH:mm").hour(),
                    minute: moment(endTime, "DD/MM/YYYY HH:mm").minute(),
                    second: moment(endTime, "DD/MM/YYYY HH:mm").second(),
                  })
                  .toISOString();

                timeSlots.push({
                  startTime: currentStart.toISOString(),
                  endTime: currentEnd,
                });
                currentStart.add(7, "days"); // Tăng lên một tuần
              }
              break;

            case "Hàng tháng":
              if (!timePeriodsToBook) {
                return res.status(400).json({
                  success: false,
                  message: "Danh sách tháng để đặt không hợp lệ.",
                });
              }
              let startMonth = moment(startTime, "DD/MM/YYYY HH:mm");
              let endMonth = moment(timePeriodsToBook, "DD/MM/YYYY HH:mm");
              while (startMonth.isSameOrBefore(endMonth)) {
                let monthEnd = moment(startMonth)
                  .set({
                    hour: moment(endTime, "DD/MM/YYYY HH:mm").hour(),
                    minute: moment(endTime, "DD/MM/YYYY HH:mm").minute(),
                    second: moment(endTime, "DD/MM/YYYY HH:mm").second(),
                  })
                  .toISOString();

                timeSlots.push({
                  startTime: startMonth.toISOString(),
                  endTime: monthEnd,
                });
                startMonth.add(1, "month"); // Tăng lên một tháng
              }
              break;

            default:
              return res.status(400).json({
                success: false,
                message: "Loại đặt sân không hợp lệ.",
              });
          }
        }

        await handleBooking(timeSlots);
      };

      await processBooking();
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
        const st = stadium.stadium_styles.find(
          (style) => style._id.toString() === stadiumStyleId.toString()
        );
        let object = {};
        const { stadium_styles, ...datas } = stadium._doc;

        object = {
          ...datas,
          ...st._doc,
          ...bookPitches[i]._doc,
          time: bookPitches[i].time.map((slot) => ({
            startTime: moment(slot.startTime).tz("Asia/Ho_Chi_Minh").format(),
            endTime: moment(slot.endTime).tz("Asia/Ho_Chi_Minh").format(),
          })),
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

        const convertedTimeSlots = bookPitch[i].time.map((slot) => ({
          startTime: moment
            .utc(slot.startTime)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY/MM/DD HH:mm"),
          endTime: moment
            .utc(slot.endTime)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY/MM/DD HH:mm"),
        }));

        oject = {
          ...datas,
          ...st._doc,
          ...bookPitch[i]._doc,
          time: convertedTimeSlots, // Cập nhật thời gian đã chuyển đổi
          originalStartTime: moment
            .utc(bookPitch[i].originalStartTime)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY/MM/DD HH:mm"),
          originalEndTime: moment
            .utc(bookPitch[i].originalEndTime)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY/MM/DD HH:mm"),
        };
        data.push(oject);
      }

      return res.status(200).json({ success: true, message: data });
    } catch (error) {
      console.log("🚀 ~ getAnBookPitches: ~ error:", error);
      return res.status(500).json(error);
    }
  },

  getStadiumOwnerBookings: async (req, res) => {
    try {
      const booking = await BookPitch.find()
        .populate("stadium")
        .populate({ path: "user", select: "username" });
      const customerBooking = booking.filter(
        (book) =>
          book.stadium &&
          book.stadium.stadium_owner &&
          book.stadium.stadium_owner.toString() === req.customer.id.toString()
      );

      const stadiumStyleIds = customerBooking
        .filter((booking) => booking.stadiumStyle)
        .map((booking) => booking.stadiumStyle.toString());

      const matchingStadiumStyles = customerBooking
        .filter(
          (booking) =>
            booking.stadiumStyle &&
            stadiumStyleIds.includes(booking.stadiumStyle.toString())
        )
        .map((booking) => booking.stadium.stadium_styles)
        .flat()
        .filter(
          (style, index, self) =>
            index ===
            self.findIndex((s) => s._id.toString() === style._id.toString())
        );

      const updatedBookings = customerBooking.map((booking) => {
        const updatedStadiumStyle = matchingStadiumStyles.find(
          (style) => style._id.toString() === booking.stadiumStyle.toString()
        );
        console.log(
          "🚀 ~ updatedBookings ~ updatedStadiumStyle:",
          updatedStadiumStyle
        );
        return {
          ...booking.toObject(),
          stadium: {
            ...booking.stadium.toObject(),
            stadium_styles: updatedStadiumStyle ? [updatedStadiumStyle] : [],
          },
        };
      });
      return res.status(200).json({ success: true, message: updatedBookings });
    } catch (error) {
      console.log("🚀 ~ getStadiumOwnerBookPitch: ~ error:", error);
      return res.status(500).json(error);
    }
  },

  deleteBookPitchs: async (req, res) => {
    try {
      await BookPitch.findByIdAndDelete(req.params.id);
      return res.status(200).json("Xóa lịch thành công");
    } catch (error) {
      console.log("🚀 ~ deleteBookPitchs:async ~ error:", error);
      return res.status(500).json(error);
    }
  },

  updateBookPitch: async (req, res) => {
    try {
      const { phone, startTime, endTime } = req.body;
      const { id } = req.params;
      if (new Date(endTime) <= new Date(startTime)) {
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

      const booking = await BookPitch.findById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đặt sân",
        });
      }

      const overlappingBooking = await BookPitch.find({
        stadium: booking.stadium,
        stadiumStyle: booking.stadiumStyle,
        _id: { $ne: id }, // Loại trừ đặt sân hiện tại
        $or: [
          { startTime: { $lt: new Date(endTime), $gt: new Date(startTime) } },
          { endTime: { $gt: new Date(startTime), $lt: new Date(endTime) } },
          {
            startTime: { $lte: new Date(startTime) },
            endTime: { $gte: new Date(endTime) },
          },
        ],
      });

      if (overlappingBooking.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Khung giờ này đã có người đặt",
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
      console.log("🚀 ~ updateBookPitch: ~ error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getAnBookPitch: async (req, res) => {
    try {
      const idCustomer = req.customer.id;
      const bookPitch = await BookPitch.findOne({
        status: "pending",
        user: idCustomer,
      });
      if (!bookPitch) {
        return res.status(404).json({
          success: false,
          message: "Book pitch not found",
        });
      }
      const stadium = await Stadium.findOne({
        "stadium_styles._id": bookPitch.stadiumStyle,
      });
      if (!stadium) {
        return res.status(404).json({
          success: false,
          message: "Stadium not found",
        });
      }
      const st = stadium.stadium_styles.find(
        (style) => style._id.toString() === bookPitch.stadiumStyle.toString()
      );
      if (!st) {
        return res.status(404).json({
          success: false,
          message: "Stadium style not found",
        });
      }
      const convertedTimeSlots = bookPitch.time.map((slot) => ({
        startTime: moment
          .utc(slot.startTime)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY/MM/DD HH:mm"),
        endTime: moment
          .utc(slot.endTime)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY/MM/DD HH:mm"),
      }));
      const data = {
        ...stadium._doc,
        ...st._doc,
        ...bookPitch._doc,
        time: convertedTimeSlots,
        originalStartTime: moment
          .utc(bookPitch.originalStartTime)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY/MM/DD HH:mm"),
        originalEndTime: moment
          .utc(bookPitch.originalEndTime)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY/MM/DD HH:mm"),
      };
      delete data.stadium_styles;
      return res.status(200).json({
        success: true,
        data: [data],
      });
    } catch (error) {
      console.log("🚀 ~ getAnBookPitch: ~ error:", error);
      return res.status(500).json(error);
    }
  },

  cancelpayment: async (req, res) => {
    try {
      const id = req.customer.id;
      await BookPitch.findOneAndDelete({ status: "pending", user: id });
      return res.status(200).json({
        success: true,
        message: "Xóa thanh toán thành công",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getBooked: async (req, res) => {
    try {
      const { idStadium } = req.params;
      const bookings = await BookPitch.find({
        status: "confirmed",
        stadium: idStadium,
      });
      const stadium = await Stadium.findById(idStadium);
      if (!stadium) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sân",
        });
      }
      const styles = stadium.stadium_styles;
      if (!styles || styles.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy kiểu sân",
        });
      }

      const bookedTimesByStyle = styles.map((style) => {
        const bookedTimes = bookings
          .filter((booking) => booking.stadiumStyle.equals(style._id))
          .flatMap((booking) =>
            booking.time.map((t) => ({
              start: moment(t.startTime)
                .tz("Asia/Ho_Chi_Minh")
                .format("YYYY-MM-DDTHH:mm:ss"),
              end: moment(t.endTime)
                .tz("Asia/Ho_Chi_Minh")
                .format("YYYY-MM-DDTHH:mm:ss"),
              book: true,
            }))
          );

        return {
          style: style.name,
          id: style._id,
          price: style.price,
          bookedTimes: bookedTimes,
        };
      });

      return res.status(200).json({
        success: true,
        data: bookedTimesByStyle,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = bookPitchController;
