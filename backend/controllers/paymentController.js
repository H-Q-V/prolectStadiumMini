const Helper = require("../utils/helper.js");
const payos = require("../modules/payos.js");
const BookPitch = require("../model/bookPitch.js");
const Customer = require("../model/customer.js");
const PayStatus = require("../model/payStatus.js");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const payment = {
  async createPayment(req, res) {
    try {
      const userId = req.customer;
      const username = await Customer.findOne({ _id: userId.id });

      //console.log("a:", username);
      if (!username) {
        return res
          .status(500)
          .json({ message: "Không thể tìm thấy người dùng này!" });
      }
      const bookings = await BookPitch.find({ user: userId.id }).populate(
        "stadium"
      );
      //console.log("b:", bookings);
      if (!bookings) {
        return res
          .status(500)
          .json({ message: "Không thể tìm thấy lịch đặt!" });
      }
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đặt sân của khách hàng",
        });
      }
      let totalAmount = 0;
      for (let booking of bookings) {
        const stadium = booking.stadium;
        const stadiumStyle = stadium.stadium_styles.id(booking.stadiumStyle);
        if (stadiumStyle) {
          const pricePerSlot = parseFloat(
            stadiumStyle.price.replace(/\./g, "")
          );
          totalAmount += pricePerSlot * booking.time.length;
        }
      }
      const totalMoney = totalAmount * 0.15; // Tiền đặt cọc

      const desc = Helper.random(9);
      const codeOrder = Helper.generateOrderCode();
      const order = {
        orderCode: codeOrder,
        amount: Number(totalMoney),
        description: `${desc}`,
        buyerName: username.username,
        buyerEmail: username.email,
        returnUrl: `https://chatgpt.com/c/dbf6dad5-9f56-4f71-bc91-f08378dd208f`,
        cancelUrl: `https://chatgpt.com/c/dbf6dad5-9f56-4f71-bc91-f08378dd208f`,
      };
      console.log(order);
      //2: Đang chờ
      //1: Đã huỷ
      //0: Thành công

      await PayStatus.create({
        User: userId.id,
        Charity: codeOrder,
        Amount: totalMoney,
        Status: "pending",
        Code: desc,
      });
      const paymentLink = await payos.createPaymentLink(order);
      console.log(paymentLink);
      //req.session.userId = userId.id;
      return res.status(200).json({ url: paymentLink.checkoutUrl });
    } catch (err) {
      res.status(401).json({
        name: err.name,
        message: err.massage,
      });
    }
  },
  async AuthenPay(req, res) {
    try {
      if (req.body.code == "00") {
        const code = req.body.data.description;
        console.log("a:", code);
        //const amount = req.body.data.amount;
        const inforDonate = await PayStatus.findOneAndUpdate(
          { Code: code },
          { Status: "confirmed" },
          { new: true }
        );
        const bookingStatus = await BookPitch.findOne({
          user: inforDonate.User,
        });
        if (!bookingStatus) {
          return res.status(404).json({
            success: false,
            message: "Không tìm thấy đặt sân để cập nhật trạng thái",
          });
        }
        console.log("Oke");
        bookingStatus.status = "confirmed"; // For example
        await bookingStatus.save();
      }

      return res.status(200).json({
        success: true,
        message: "Trạng thái đặt sân đã được cập nhật",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};

module.exports = payment;
