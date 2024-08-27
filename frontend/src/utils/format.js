import date from "date-and-time";

export const formatDateTime = (timeString) => {
  const dateObj = new Date(timeString);
  const utcString = date.format(dateObj, "DD/MM/YYYY HH:mm", true);
  return utcString;
};
export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
};
