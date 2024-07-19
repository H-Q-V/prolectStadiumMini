const jwt = require("jsonwebtoken");
const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      //Bearer 123456
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, customer) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.customer = customer;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.customer.id == req.params.id || req.customer.admin) {
        next();
      } else {
        res.status(403).json("You are not allowed to delete other");
      }
    });
  },
};
module.exports = middlewareController;
