import date from "date-and-time";
import moment from "moment";
export const formatTime = (time) => {
  if (time) {
    const dateTime = new Date(time);
    if (!isNaN(dateTime.getTime())) {
      return date.format(dateTime, "YYYY/MM/DD HH:mm");
    }
  }
  return "Invalid date";
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
