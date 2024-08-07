import date from "date-and-time";
export const formatBookingTime = (time) => {
  if (time) {
    const dateTime = new Date(time);
    if (!isNaN(dateTime.getTime())) {
      return date.format(dateTime, "YYYY/MM/DD HH:mm");
    }
  }
  return "Invalid date";
};
