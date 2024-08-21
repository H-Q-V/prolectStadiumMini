const Team = require('../model/team');
const ManMaking = require('../model/manMarking');
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
      /*
      if (typeof name !== 'string' || typeof job !== 'string' || typeof averageAge !== 'number' || averageAge <= 0) {
        return res.status(400).json({
          success: false,
          message: "Thông tin không hợp lệ"
        });
      }
        */
      const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: "Số điện thoại không hợp lệ" });
      }
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
      console.error('Lỗi khi thêm đội bóng:', error); 
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
      const { search,name,averageAge,job } = req.query;
      let queries = [];
      if(search){
        queries.push({
          $or: [
            { name: { $regex: search, $options: "i" } },
            //{ averageAge: { $regex: search, $options: "i" } },
          ],
        });
      }
      if (name) {
        queries.push({name: { $regex:name, $options: "i"}});
      }
      
      if (averageAge) {
        const averageAgeNumber = Number(averageAge);
        if (!isNaN(averageAgeNumber)) {
          queries.push({ averageAge: averageAgeNumber });
        }
      }
      if (job) {
        queries.push({job: { $regex:job, $options: "i"}});
      }
      const query = queries.length > 0 ? { $and: queries } : {};
      const projection = {
        _id: 1,
        name: 1,
        averageAge: 1,
        job: 1,
        phone:1,
        teamFounder: 1,
      };
       const teams = await Team.find(query, projection);
       return res.status(200).json({message: "tìm kiếm thành công",data:teams})
    } catch (error) {
       return res.status(500).json(error);
    }
  },
  sendAnInvitation: async(req,res) => {
    try {
      const id = req.customer.id;
      const team = await Team.findOne({teamFounder:id});
      const teamreceives = await Team.findById(req.params.idTeam);
      console.log("a", team);
      console.log("b", teamreceives);
      const response = await ManMaking.create({
           teamSends: team.name,
           teamReceives: teamreceives.name,
           ownerTeamSends: team.teamFounder,
           ownerTeamReceives: teamreceives.teamFounder,
      })
      return res.status(200).json({
        message: "Gửi lời mời thành công",
        data: response,
      });
    }catch (error) {
       return res.status(500).json(error);
    }
  },
  getAnInvitation: async (req, res) => {
    try {
      const id = req.customer.id;
      const teams = await ManMaking.find({ ownerTeamReceives: id });
      console.log("b", id);
      console.log("a", teams);
  
      if (teams.length === 0) {
        return res.status(404).json({ message: "Không có lời mời nào." });
      }
  
      const messages = teams.map(team => `Đội bóng ${team.teamSends} muốn đấu với đội bạn`);
  
      return res.status(200).json({
        messages: messages
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  receivesAnInvitation: async(req,res) => {
      try {
        const id = req.customer.id;
        const accept = await ManMaking.findOne({ownerTeamReceives:id});
        accept.status = "accept";
        accept.save();
        return res.status(200).json({
          message: `Đội bóng ${accept.teamReceives} chấp nhận tham gia trận đấu`,
        });
      } catch (error) {
        return res.status(500).json(error);
      }
  },
  deleteAnInvitation: async(req,res) => {
     try {
        const id = req.customer.id;
        await ManMaking.deleteMany({
          $or: [
            { ownerTeamReceives: id },
            { ownerTeamSends: id }
          ]
        });
        return res.status(200).json({
          message: "Xóa bắt đối thành công"
        })
     }catch (error) {
       return res.status(500).json(error);
     }
  }
  
  
};

module.exports = teamController;
