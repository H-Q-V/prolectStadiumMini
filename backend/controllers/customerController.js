const Customer = require("../model/customer");
const customerController = {
  getAllCustomer: async (req, res) => {
    try {
      const customer = await Customer.find();
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Người dùng không tìm thấy",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Thay đổi thành công" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      await Customer.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = customerController;
