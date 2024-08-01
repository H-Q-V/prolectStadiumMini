const Customer = require('../model/customer');
const BankAccount = require('../model/bankAccount');
const customerController = {
  getAllCustomer: async (req, res) => {
    try {
      const customer = await Customer.find();
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.status(200).json('Xóa thành công');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Account Bank
  addAccountBank: async (req,res) => {
    try {
      const {acc, name, bank} = req.body;
      const { idCustomer } = req.params;
      if(!acc || !name || ! bank){
        res.status(400).json({
          success: false,
          message: "Không được nhập thiếu thông tin",
        })
      }
      const response = await BankAccount.create({
        acc: acc,
        name: name,
        bank: bank,
        customer: idCustomer
      });
      res.status(200).json({
        success: true,
        message: "Thêm tài khoản ngân hàng thành công",
        data: response
      });
    } catch (error) {
      res.status(500).json("Thêm tài khoản thất bại");
    }
  },
  
  updateAccountBank: async (req,res) => {
    try {
      const {id} = req.params;
      const {acc, bank, name} = req.body;
      let updateFields = {};
      if (acc) updateFields.acc = acc;
      if (bank) updateFields.bank = bank;
      if (name) updateFields.name = name;

      // Kiểm tra xem ít nhất một trường được cung cấp
      if (Object.keys(updateFields).length === 0) {
          return res.status(400).json({
              success: false,
              message: "Phải cung cấp ít nhất một thông tin để cập nhật",
          });
      }
      const accountbank = await BankAccount.findById(id);
      if(!accountbank){
        res.status(400).json({
          success: false,
          message: "Không tìm thấy tài khoản",
        })
      }
      await accountbank.updateOne({$set: updateFields});
      return res.status(200).json({
         success: true,
         message: "Chỉnh sửa thông tin tài khoản thành công",
      })
    } catch (error) {
      res.status(500).json("Chỉnh sửa thông tin thất bại");
    }
  },
  deleteAccountBank: async(req,res) => {
    try {
      const {id} = req.params;
      const accountbank = await BankAccount.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message:"Xóa thông tin thành công",
        data: accountbank
      });
    } catch (error) {
      res.status(500).json("Xóa thông tin tài khoản thất bại");
    }
  }

};
module.exports = customerController;
