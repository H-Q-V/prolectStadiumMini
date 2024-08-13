const RevenueRecord = require("../model/revenueRecord");
const moment = require("moment");
const revenueRecordController = {
  getRevenues: async (req, res) => {
    try {
      const bookings = await RevenueRecord.find();
      const today = moment();

      // Filter bookings for the current month
      const currentMonth = today.format("YYYY-MM");
      const monthlyRevenues = bookings.filter(
        (booking) =>
          moment(booking.startTime).format("YYYY-MM") === currentMonth
      );
      const totalMonthlyRevenue = monthlyRevenues.reduce((total, booking) => {
        return total + booking.deposit;
      }, 0);

      // Filter bookings for the current week
      const startOfWeek = today.startOf("isoWeek").format("YYYY-MM-DD");
      const endOfWeek = today.endOf("isoWeek").format("YYYY-MM-DD");
      const weeklyRevenues = bookings.filter((booking) =>
        moment(booking.startTime).isBetween(
          startOfWeek,
          endOfWeek,
          undefined,
          "[]"
        )
      );
      const totalWeeklyRevenue = weeklyRevenues.reduce((total, booking) => {
        return total + booking.deposit;
      }, 0);

      return res.status(200).json({
        success: true,
        data: {
          weeklyRevenue: {
            startOfWeek,
            endOfWeek,
            revenue: totalWeeklyRevenue.toLocaleString("vi-VN"),
          },
          monthlyRevenue: {
            startOfMonth: moment(today).startOf("month").format("YYYY-MM-DD"),
            endOfMonth: moment(today).endOf("month").format("YYYY-MM-DD"),
            revenue: totalMonthlyRevenue.toLocaleString("vi-VN"),
          },
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

      const today = moment();

      // Filter and group bookings for the current month
      const currentMonth = today.format("YYYY-MM");
      const monthlyRevenues = bookings.filter(
        (booking) =>
          moment(booking.startTime).format("YYYY-MM") === currentMonth
      );

      const monthlyRevenueByStadium = monthlyRevenues.reduce((acc, booking) => {
        const stadiumName = booking.stadiumId.stadium_name;
        const ownerUsername = booking.ownerId.username;
        const deposit = booking.deposit;

        if (!acc[stadiumName]) {
          acc[stadiumName] = {
            totalDeposit: 0,
            ownerUsername: ownerUsername,
          };
        }

        acc[stadiumName].totalDeposit += deposit;

        // Ensure the ownerUsername remains consistent
        if (!acc[stadiumName].ownerUsername) {
          acc[stadiumName].ownerUsername = ownerUsername;
        }

        return acc;
      }, {});

      // Filter and group bookings for the current week
      const startOfWeek = today.startOf("isoWeek").format("YYYY-MM-DD");
      const endOfWeek = today.endOf("isoWeek").format("YYYY-MM-DD");
      const weeklyRevenues = bookings.filter((booking) =>
        moment(booking.startTime).isBetween(
          startOfWeek,
          endOfWeek,
          undefined,
          "[]"
        )
      );

      const weeklyRevenueByStadium = weeklyRevenues.reduce((acc, booking) => {
        const stadiumName = booking.stadiumId.stadium_name;
        const ownerUsername = booking.ownerId.username;
        const deposit = booking.deposit;

        if (!acc[stadiumName]) {
          acc[stadiumName] = {
            totalDeposit: 0,
            ownerUsername: ownerUsername,
          };
        }

        acc[stadiumName].totalDeposit += deposit;

        // Ensure the ownerUsername remains consistent
        if (!acc[stadiumName].ownerUsername) {
          acc[stadiumName].ownerUsername = ownerUsername;
        }

        return acc;
      }, {});

      // Format the results for display
      const formattedMonthlyRevenue = Object.entries(
        monthlyRevenueByStadium
      ).map(([stadiumName, { totalDeposit, ownerUsername }]) => ({
        stadiumName,
        total: totalDeposit.toLocaleString("vi-VN"),
        ownerUsername,
      }));

      const formattedWeeklyRevenue = Object.entries(weeklyRevenueByStadium).map(
        ([stadiumName, { totalDeposit, ownerUsername }]) => ({
          stadiumName,
          total: totalDeposit.toLocaleString("vi-VN"),
          ownerUsername,
        })
      );

      // Return the results
      return res.status(200).json({
        success: true,
        data: {
          weeklyRevenue: {
            startOfWeek,
            endOfWeek,
            stadiums: formattedWeeklyRevenue,
          },
          monthlyRevenue: {
            startOfMonth: moment(today).startOf("month").format("YYYY-MM-DD"),
            endOfMonth: moment(today).endOf("month").format("YYYY-MM-DD"),
            stadiums: formattedMonthlyRevenue,
          },
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
      const weeklyRevenue = bookings.reduce(
        (acc, book) => {
          const currentWeek = moment(book.startTime).isoWeek();
          const currentYear = moment(book.startTime).year();

          if (
            !acc ||
            (currentWeek === moment().isoWeek() &&
              currentYear === moment().year())
          ) {
            acc.startOfWeek = moment(book.startTime)
              .startOf("isoWeek")
              .format("YYYY-MM-DD");
            acc.endOfWeek = moment(book.startTime)
              .endOf("isoWeek")
              .format("YYYY-MM-DD");
            acc.revenue = (acc.revenue || 0) + (book.amount - book.deposit);
          }

          return acc;
        },
        { startOfWeek: "", endOfWeek: "", revenue: 0 }
      );

      const monthlyRevenue = bookings.reduce((acc, book) => {
        const month = moment(book.startTime).format("YYYY-MM");

        if (!acc[month]) {
          acc[month] = {
            startOfMonth: moment(book.startTime)
              .startOf("month")
              .format("YYYY-MM-DD"),
            endOfMonth: moment(book.startTime)
              .endOf("month")
              .format("YYYY-MM-DD"),
            revenue: 0,
          };
        }
        acc[month].revenue += book.amount - book.deposit;

        return acc;
      }, {});

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
        (book) => book.ownerId.toString() === stadiumOwnerID.toString()
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
        const amount = booking.amount;
        const deposit = booking.deposit;
        const total = amount - deposit;

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
        acc[month].stadiums[stadiumName] += total;

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
        const amount = booking.amount;
        const deposit = booking.deposit;
        const total = amount - deposit;

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
        acc[week].stadiums[stadiumName] += total;

        return acc;
      }, {});

      // Format the totals for display
      const formattedMonthlyRevenue = Object.entries(monthlyRevenue).map(
        ([month, details]) => {
          return {
            startOfMonth: details.startOfMonth,
            endOfMonth: details.endOfMonth,
            stadiums: Object.entries(details.stadiums).map(
              ([stadiumName, total]) => ({
                stadiumName,
                total: total.toLocaleString("vi-VN"),
              })
            ),
          };
        }
      );

      const formattedWeeklyRevenue = Object.entries(weeklyRevenue).map(
        ([week, details]) => {
          return {
            startOfWeek: details.startOfWeek,
            endOfWeek: details.endOfWeek,
            stadiums: Object.entries(details.stadiums).map(
              ([stadiumName, total]) => ({
                stadiumName,
                total: total.toLocaleString("vi-VN"),
              })
            ),
          };
        }
      );

      return res.status(200).json({
        success: true,
        data: {
          monthlyRevenue: formattedMonthlyRevenue,
          weeklyRevenue: formattedWeeklyRevenue,
        },
      });
    } catch (error) {
      console.log("🚀 ~ getRevenueOwner: ~ error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = revenueRecordController;
