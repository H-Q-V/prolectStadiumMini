const Team = require('../model/team');
const teamController = {
  addTeam: async (req, res) => {
    try {
      const { name, averageAge, job, phone } = req.body;
      
      // Kiểm tra đầu vào
      if (!name || !averageAge || !job || !phone) {
        return res.status(400).json({
          success: false,
          message: "Không được nhập thiếu thông tin"
        });
      }
      
      // Kiểm tra kiểu dữ liệu
      if (typeof name !== 'string' || typeof job !== 'string' || typeof averageAge !== 'number' || averageAge <= 0) {
        return res.status(400).json({
          success: false,
          message: "Thông tin không hợp lệ"
        });
      }
      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: "Số điện thoại không hợp lệ" });
      }
      // Tạo đội bóng
      const response = await Team.create({
        name: name,
        averageAge: averageAge,
        job: job,
        phone: phone,
        teamFounder: req.customer.id,
      });
      
      return res.status(200).json({
        success: true,
        data: response,
        message: "Thêm đội bóng thành công"
      });
    } catch (error) {
      console.error('Lỗi khi thêm đội bóng:', error); // Ghi log lỗi chi tiết hơn
      return res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi, vui lòng thử lại sau"
      });
    }
  },
  updateTeam: async(req,res) => {
    try {
      const {idteamFounder} = req.customer.id;
      const {name,averageAge,job,phone} = req.body;
      let update = {};
      if (name) update.name = name;
      if (averageAge) update.averageAge = averageAge;
      if (job) update.job = job;
      if (phone) update.phone = phone;
      // Kiểm tra xem ít nhất một trường được cung cấp
      if (Object.keys(update).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Phải cung cấp ít nhất một thông tin để cập nhật",
        });
      }
      
      const team = await Team.findOne(idteamFounder);
      if(!team){
        res.status(400).json({
          success: false,
          message: "Không tìm thấy tài khoản",
        })
      }
      await team.updateOne({$set: update});
      return res.status(200).json({
        success: true,
        message: "Chỉnh sửa thông tin tài khoản thành công",
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  deleteTeam: async(req,res) => {
    try {
      const {idteamFounder} = req.customer.id;
      const delteTeam = await Team.findByIdAndDelete(idteamFounder);
      return res.status(200).json({
        success: true,
        message: "Xóa thông tin đội bóng thành công",
      })
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  searchTeam: async(req,res) => {
    try {
      const { search,name, averageAge, job} = req.query;
      let queries = [];
      if(search){
        queries.push({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { averageAge: { $regex: search, $options: "i" } },
          ],
        });
      }
      if (name) {
        queries.push({name: { $regex:name, $options: "i"}});
      }
      if (averageAge) {
        queries.push({averageAge: { $regex:averageAge, $options: "i"}});
      }
      if (job) {
        queries.push({averageAge: { $regex:job, $options: "i"}});
      }
      const query = queries.length.length > 0 ? {$and: queries} : {};
      const projection = {
        _id: 1,
        name: 1,
        averageAge: 1,
        job: 1,
      };
      const teams = await Team.find(query, projection).populate(
        "Team"
      );
      return res.status(200).json({message: "tìm kiếm thành công",data:teams})
    } catch (error) {
       return res.status(500).json(error);
    }
  }
};

module.exports = teamController;
