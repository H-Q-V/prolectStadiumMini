const cron = require('node-cron');
const BookPitch = require('../model/bookPitch');

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
module.exports = cron;
