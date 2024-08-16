const RevenueRecord = require("../model/revenueRecord");
const moment = require("moment");

const calculateRevenue = (
  bookings,
  timeUnit,
  format,
  isWeekly = false,
  useDeposit = false
) => {
  const revenueMap = bookings.reduce((acc, booking) => {
    const key = isWeekly
      ? `${moment(booking.startTime).startOf("isoWeek").format("YYYY-MM-DD")} to ${moment(booking.startTime).endOf("isoWeek").format("YYYY-MM-DD")}`
      : moment(booking.startTime).format(format);

    if (!acc[key]) {
      acc[key] = {
        start: isWeekly
          ? moment(booking.startTime).startOf("isoWeek").format("YYYY-MM-DD")
          : moment(booking.startTime).startOf(timeUnit).format("YYYY-MM-DD"),
        end: isWeekly
          ? moment(booking.startTime).endOf("isoWeek").format("YYYY-MM-DD")
          : moment(booking.startTime).endOf(timeUnit).format("YYYY-MM-DD"),
        revenue: 0,
      };
    }
    acc[key].revenue += useDeposit
      ? booking.deposit
      : booking.amount - booking.deposit;

    return acc;
  }, {});
  return Object.values(revenueMap);
};

const revenueRecordController = {
  getRevenues: async (req, res) => {
    try {
      const bookings = await RevenueRecord.find();
      const today = moment();

      const monthlyRevenue = calculateRevenue(
        bookings,
        "month",
        "YYYY-MM",
        false,
        true
      ).filter((rev) => moment(rev.start).isSameOrBefore(today, "month"));

      const weeklyRevenue = calculateRevenue(
        bookings,
        "isoWeek",
        "YYYY-MM-DD",
        true,
        true
      );

      return res.status(200).json({
        success: true,
        data: {
          weeklyRevenue,
          monthlyRevenue,
        },
      });
    } catch (error) {
      console.log("🚀 ~ getRevenues: ~ error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getRevenue: async (req, res) => {
    try {
      const bookings = await RevenueRecord.find()
        .populate("stadiumId")
        .populate("ownerId");

      const monthlyRevenueByStadium = bookings.reduce((acc, booking) => {
        const stadiumName = booking.stadiumId.stadium_name;
        const month = moment(booking.startTime).format("YYYY-MM");
        const deposit = booking.deposit;

        if (!acc[month]) {
          acc[month] = {
            startOfMonth: moment(booking.startTime)
              .startOf("month")
              .format("YYYY-MM-DD"),
            endOfMonth: moment(booking.startTime)
              .endOf("month")
              .format("YYYY-MM-DD"),
            stadiums: {},
          };
        }

        if (!acc[month].stadiums[stadiumName]) {
          acc[month].stadiums[stadiumName] = 0;
        }
        acc[month].stadiums[stadiumName] += deposit; // Use deposit only

        return acc;
      }, {});

      // Calculate weekly revenue
      const weeklyRevenueByStadium = bookings.reduce((acc, booking) => {
        const stadiumName = booking.stadiumId.stadium_name;
        const week = `${moment(booking.startTime).year()}-W${moment(booking.startTime).isoWeek()}`;
        const startOfWeek = moment(booking.startTime)
          .startOf("isoWeek")
          .format("YYYY-MM-DD");
        const endOfWeek = moment(booking.startTime)
          .endOf("isoWeek")
          .format("YYYY-MM-DD");
        const deposit = booking.deposit;

        if (!acc[week]) {
          acc[week] = {
            startOfWeek,
            endOfWeek,
            stadiums: {},
          };
        }

        if (!acc[week].stadiums[stadiumName]) {
          acc[week].stadiums[stadiumName] = 0;
        }
        acc[week].stadiums[stadiumName] += deposit; // Use deposit only

        return acc;
      }, {});

      // Format monthly revenue data
      const formattedMonthlyRevenue = Object.values(
        monthlyRevenueByStadium
      ).map((rev) => ({
        start: rev.startOfMonth,
        end: rev.endOfMonth,
        stadiums: Object.entries(rev.stadiums).map(([stadiumName, total]) => ({
          stadiumName,
          total,
        })),
      }));

      // Format weekly revenue data
      const formattedWeeklyRevenue = Object.values(weeklyRevenueByStadium).map(
        (rev) => ({
          start: rev.startOfWeek,
          end: rev.endOfWeek,
          stadiums: Object.entries(rev.stadiums).map(
            ([stadiumName, total]) => ({
              stadiumName,
              total,
            })
          ),
        })
      );

      return res.status(200).json({
        success: true,
        data: {
          monthlyRevenue: formattedMonthlyRevenue,
          weeklyRevenue: formattedWeeklyRevenue,
        },
      });
    } catch (error) {
      console.log("🚀 ~ getRevenue: ~ error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getRevenuesOwner: async (req, res) => {
    try {
      const stadiumOwnerID = req.customer.id;
      const bookings = await RevenueRecord.find({ ownerId: stadiumOwnerID });

      const weeklyRevenue = calculateRevenue(
        bookings,
        "isoWeek",
        "YYYY-MM-DD",
        true,
        false // Use amount - deposit
      );
      const monthlyRevenue = calculateRevenue(
        bookings,
        "month",
        "YYYY-MM",
        false,
        false // Use amount - deposit
      );

      return res.status(200).json({
        success: true,
        data: {
          weeklyRevenue,
          monthlyRevenue,
        },
      });
    } catch (error) {
      console.log("🚀 ~ getRevenuesOwner: ~ error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getRevenueOwner: async (req, res) => {
    try {
      const stadiumOwnerID = req.customer.id;
      const bookings = await RevenueRecord.find().populate("stadiumId");
      const stadiumOwnerBookings = bookings.filter(
        (booking) => booking.ownerId.toString() === stadiumOwnerID.toString()
      );

      const monthlyRevenue = stadiumOwnerBookings.reduce((acc, booking) => {
        const stadiumName = booking.stadiumId.stadium_name;
        const month = moment(booking.startTime).format("YYYY-MM");
        const startOfMonth = moment(booking.startTime)
          .startOf("month")
          .format("YYYY-MM-DD");
        const endOfMonth = moment(booking.startTime)
          .endOf("month")
          .format("YYYY-MM-DD");
        const total = booking.amount - booking.deposit;

        if (!acc[month]) {
          acc[month] = {
            startOfMonth,
            endOfMonth,
            stadiums: {},
          };
        }
        if (!acc[month].stadiums[stadiumName]) {
          acc[month].stadiums[stadiumName] = 0;
        }
        acc[month].stadiums[stadiumName] += total; // Use amount - deposit

        return acc;
      }, {});

      const weeklyRevenue = stadiumOwnerBookings.reduce((acc, booking) => {
        const stadiumName = booking.stadiumId.stadium_name;
        const week = `${moment(booking.startTime).year()}-W${moment(booking.startTime).isoWeek()}`;
        const startOfWeek = moment(booking.startTime)
          .startOf("isoWeek")
          .format("YYYY-MM-DD");
        const endOfWeek = moment(booking.startTime)
          .endOf("isoWeek")
          .format("YYYY-MM-DD");
        const total = booking.amount - booking.deposit;

        if (!acc[week]) {
          acc[week] = {
            startOfWeek,
            endOfWeek,
            stadiums: {},
          };
        }
        if (!acc[week].stadiums[stadiumName]) {
          acc[week].stadiums[stadiumName] = 0;
        }
        acc[week].stadiums[stadiumName] += total; // Use amount - deposit

        return acc;
      }, {});

      const formatRevenue = (revenueByTimeUnit) =>
        Object.entries(revenueByTimeUnit).map(([key, details]) => ({
          start: details.startOfWeek || details.startOfMonth,
          end: details.endOfWeek || details.endOfMonth,
          stadiums: Object.entries(details.stadiums).map(
            ([stadiumName, total]) => ({
              stadiumName,
              total,
            })
          ),
        }));

      return res.status(200).json({
        success: true,
        data: {
          monthlyRevenue: formatRevenue(monthlyRevenue),
          weeklyRevenue: formatRevenue(weeklyRevenue),
        },
      });
    } catch (error) {
      console.log("🚀 ~ getRevenueOwner: ~ error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = revenueRecordController;
