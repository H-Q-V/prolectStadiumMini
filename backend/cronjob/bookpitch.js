const cron = require("node-cron");
const BookPitch = require("../model/bookPitch");
const RevenueRecord = require("../model/revenueRecord");
cron.schedule("0 0 * * *", async () => {
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
  (module.exports = cron);
