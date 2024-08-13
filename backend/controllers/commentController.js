const Comment = require("../model/comment");
const { Stadium } = require("../model/stadium");
const commentController = {
  createComment: async (req, res) => {
    try {
      const { comments } = req.body;
      const stadium = await Stadium.findById(req.params.stadiumID);
      if (!comments) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Vui lòng để lại đánh giá của bạn",
          });
      }
      if (!stadium) {
        return res
          .status(404)
          .json({ success: false, message: "Sân vận động không tìm thấy" });
      }

      const response = await Comment.create({
        comments: comments,
        stadium: stadium,
        user: req.customer.id,
      });

      const data = await response.populate("user");
      return res.status(200).json({ success: true, message: data });
    } catch (error) {
      console.log("🚀 ~ createComment:async ~ error:", error);
      return res.status(500).json({ success: false, message: error });
    }
  },

  getComments: async (req, res) => {
    try {
      const comments = await Comment.find({
        stadium: req.params.stadiumID,
      }).populate("user");

      return res.status(200).json({ 
        success: true,
         message: comments 
        });
    } catch (error) {
      console.log("🚀 ~ getComments: ~ error:", error);
      return res.status(500).json({ success: false, message: error });
    }
  },
};

module.exports = commentController;
