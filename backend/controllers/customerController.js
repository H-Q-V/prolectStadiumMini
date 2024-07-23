const Customer = require('../model/customer');
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
      res.status(200).json('delete done');
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = customerController;
