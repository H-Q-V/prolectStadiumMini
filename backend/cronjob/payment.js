const cron = require('node-cron');
const BookPitch = require('../model/bookPitch');

cron.schedule("*/1 * * * *", async () => {
  // Chạy mỗi phút
  try {
    console.log("Cron job bắt đầu chạy...");
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 15 * 60 * 1000);
    console.log("Thời gian 1 phút trước:", oneMinuteAgo);
    const bookingsToDelete = await BookPitch.find({
      status: "pending",
      createdAt: { $lt: oneMinuteAgo },
    });
    console.log("Các bản ghi tìm thấy:", bookingsToDelete);
    if (bookingsToDelete.length > 0) {
      const deleteResult = await BookPitch.deleteMany({
        _id: { $in: bookingsToDelete.map((b) => b._id) },
      });
      console.log(
        `${deleteResult.deletedCount} booking(s) đã được xóa do không thanh toán.`
      );
    } else {
      console.log("Không có booking nào cần xóa.");
    }
  } catch (err) {
    console.error("Lỗi khi thực hiện cron job:", err);
  }
});
module.exports = cron;
