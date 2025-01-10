const jwt = require("jsonwebtoken");
const environment = require("../utils/environment");
const { sendErrorResponse } = require("../utils/response");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token =
      (authHeader && authHeader.split(" ")[1]) || req.cookies["token"] || "";
    if (!token) {
      return sendErrorResponse(
        res,
        { message: "Unauthorized Access"},
        401
      );
    }
    let decoded = jwt.decode(token);

    jwt.verify(token, environment.jwt.secret, async (err, user) => {
      if (err) {
        return sendErrorResponse(
          res,
          { message: "Invalid Token or Expired" },
          401
        );
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log("authentication err");
    return sendErrorResponse(res, { message: "Unauthorized Access" }, 401);
  }
};
