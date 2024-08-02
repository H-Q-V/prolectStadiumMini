const Transaction = require("../model/transactionHistory");
const { bookPitch } = require("./bookPitchController");

const handlePaymentWebhook = async (req, res) => {
    try {
        console.log(req.body);
        const transferType = req.body;
        const {idcustomer} = req.customer.id;
        const bookpitch = await bookPitch.findOne({user:idcustomer}).populate('user');
        if (transferType.transferType === 'in') {
            console.log("Giao dịch thành công");

            // Lưu thông tin giao dịch vào cơ sở dữ liệu
            
            const transaction = new Transaction({
                user: bookpitch.user._id,
                status: "Giao dịch thành công"
            });
            

            await transaction.save();

            return res.status(200).json({
                success: true,
                message: "Giao dịch thành công"
            });
        } else {
            console.log("Giao dịch thất bại");

            // Lưu thông tin giao dịch thất bại vào cơ sở dữ liệu
            
            const transaction = new Transaction({
                user: req.customer.id,
                status: "Giao dịch thất bại"
            });
            
            await transaction.save();

            return res.status(500).json({
                success: false,
                message: "Giao dịch thất bại"
            });
        }
    } catch (error) {
        console.error('🚀 ~ handlePaymentWebhook ~ error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    handlePaymentWebhook
};
