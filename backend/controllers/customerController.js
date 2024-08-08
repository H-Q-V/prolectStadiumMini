const Customer = require("../model/customer");
const bcrypt = require("bcrypt");
const customerController = {
  addUsers: async (req, res) => {
    try {
      const { email, password, username, role } = req.body;

      if (!email || !password || !username || !role) {
        return res
          .status(400)
          .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
      }

      if (username.length < 6) {
        return res
          .status(400)
          .json({ success: false, message: "Tên tối thiểu 6 ký tự" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ success: false, message: "Mật khẩu tối thiểu 8 ký tự" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Email không hợp lệ" });
      }

      const emailCustomer = await Customer.findOne({ email: email });
      if (emailCustomer) {
        return res
          .status(400)
          .json({ success: false, message: "Email đã tồn tại" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const response = await Customer.create({
        email: email,
        password: hashed,
        username: username,
        role: role,
      });
      return res.status(200).json({ success: true, message: response });
    } catch (error) {
      console.log("🚀 ~ addUsers: ~ error:", error);
      return res.status(500).json({ success: false, message: error });
    }
  },

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
      const userID = req.params.id;
      const { email, username, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateCustomer = await Customer.findByIdAndUpdate(
        userID,
        { email, username, password: hashedPassword, role },
        { new: true, runValidators: true }
      );

      if (!updateCustomer) {
        return res
          .status(404)
          .json({ success: false, message: "Người dùng không tìm thấy" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Cập nhật thành công" });
    } catch (error) {
      console.log("🚀 ~ updateCustomer: ~ error:", error);
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
