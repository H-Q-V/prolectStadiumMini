const Helper = require('../utils/helper.js');
const payos = require('../modules/payos.js');
const BookPitch = require('../model/bookPitch.js');
const Customer = require("../model/customer.js");
const PayStatus = require("../model/payStatus.js");
const cron = require('node-cron');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const payment = {
    
async createPayment(req, res) {
    try { 
      const userId = req.customer;
      const username = await Customer.findOne({_id:userId.id});
      if (!username) {
        return res.status(500).json({ message: 'Không thể tìm thấy người dùng này!' });
      }
      const bookings = await BookPitch.find({user:userId.id}).populate('stadium');
      if (!bookings) {
        return res.status(500).json({ message: 'Không thể tìm thấy lịch đặt!' });
      }
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy đặt sân của khách hàng',
        });
      }
      let totalAmount = 0;
      for (let booking of bookings) {
          const stadium = booking.stadium;
          const stadiumStyle = stadium.stadium_styles.id(booking.stadiumStyle);
          if (stadiumStyle) {
              const pricePerSlot = parseFloat(stadiumStyle.price.replace(/\./g, ''));
              totalAmount += pricePerSlot * booking.time.length;
          }
      }
      const totalMoney = totalAmount * 0.15; // Tiền đặt cọc
      //for (let booking of bookings) {
        //booking.totalAmount = totalAmount;
        //booking.deposit = totalMoney;
        //await booking.save();
      //}
      const desc = Helper.random(9);
      const codeOrder = Helper.generateOrderCode();
      const order = {
        orderCode: codeOrder,
        amount: Number(totalMoney),
        description: `${desc}`,
        buyerName: username.username,
        buyerEmail: username.email,
        returnUrl: `https://chatgpt.com/c/dbf6dad5-9f56-4f71-bc91-f08378dd208f`,
        cancelUrl: `https://chatgpt.com/c/dbf6dad5-9f56-4f71-bc91-f08378dd208f`
      };
      console.log(order)
      //2: Đang chờ
      //1: Đã huỷ
      //0: Thành công

      await PayStatus.create({
        User: userId.id,
        Charity: codeOrder,
        Amount: totalMoney,
        Status: 'pending',
        Code: desc
      })
      const paymentLink = await payos.createPaymentLink(order);
      console.log(paymentLink)
      //req.session.userId = userId.id;
      return res.status(200).json({ url: paymentLink.checkoutUrl });
    } catch (err) {
      res.status(401).json({
        name: err.name,
        message: err.massage
      });
    }
  },
async AuthenPay(req,res) {
  try {
    if(req.body.code == '00'){
      const code = req.body.data.description;
      console.log("a:", code);
      //const amount = req.body.data.amount;
      const inforDonate = await PayStatus.findOneAndUpdate({ Code: code },{ Status: "confirmed" }, { new: true });
      
      const bookingStatus = await BookPitch.findOne({user:inforDonate.User});
      if (!bookingStatus) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đặt sân để cập nhật trạng thái"
        });
      }
      console.log('Oke')
      bookingStatus.status = "confirmed"; // For example
      await bookingStatus.save();
    }
     
    return res.status(200).json({
      success: true,
      message: "Trạng thái đặt sân đã được cập nhật"
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
}


}
cron.schedule('*/1 * * * *', async () => { // Chạy mỗi phút
  try {
    console.log('Cron job bắt đầu chạy...'); 
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 15 * 60 * 1000); 
    console.log('Thời gian 1 phút trước:', oneMinuteAgo); 
    const bookingsToDelete = await BookPitch.find({
      status: 'pending',
      createdAt: { $lt: oneMinuteAgo }
    });
    console.log('Các bản ghi tìm thấy:', bookingsToDelete); 
    if (bookingsToDelete.length > 0) {
      const deleteResult = await BookPitch.deleteMany({
        _id: { $in: bookingsToDelete.map(b => b._id) }
      });
      console.log(`${deleteResult.deletedCount} booking(s) đã được xóa do không thanh toán.`);
    } else {
      console.log('Không có booking nào cần xóa.');
    }
  } catch (err) {
    console.error('Lỗi khi thực hiện cron job:', err);
  }
});

module.exports = payment