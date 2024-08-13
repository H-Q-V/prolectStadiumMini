const cron = require('node-cron');
const BookPitch = require('../model/bookPitch');
const RevenueRecord = require("../model/revenueRecord");
/*
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
*/
cron.schedule("25 8 * * *", async () => {
  try {
    const expiredBookings = await BookPitch.find({
      "time.endTime": { $lt: new Date() },
      status: "confirmed",
    }).populate("stadium");
    for (let booking of expiredBookings) {
      const amount = parseFloat(booking.totalAmount.replace(/\./g, ""));
      const deposit = parseFloat(booking.deposit.replace(/\./g, ""));
      await RevenueRecord.create({
        bookingId: booking._id,
        ownerId: booking.stadium.stadium_owner,
        stadiumId: booking.stadium._id,
        amount: amount,
        deposit: deposit,
        startTime: booking.time[0].startTime,
        endTime: booking.time[0].endTime,
      });

      await BookPitch.findByIdAndDelete(booking._id);
    }

    console.log("Đã lưu và xóa các đơn đặt sân đã quá thời gian.");
  } catch (err) {
    console.error("Lỗi khi xử lý các đơn đặt sân:", err);
  }
}),
module.exports = cron;
