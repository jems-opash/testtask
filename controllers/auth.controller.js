const UserModel = require("../models/users.model");
const environment = require("../utils/environment");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return sendErrorResponse(
        res,
        { message: "Account with that email address already exists." },
        400
      );
    }

    await UserModel.create({
      name,
      password,
      email,
    });

    return sendSuccessResponse(res, {
      message: "User register successfully",
    });
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let checkUser = await UserModel.findOne({ email }).select("+password");

    if (!checkUser) {
      return sendErrorResponse(
        res,
        { message: " Account with this email address not exists." },
        400
      );
    }

    const pass = await checkUser.comparePasswordAsync(password);
    if (!pass) {
      return sendErrorResponse(
        res,
        { message: "Password is not correct" },
        400
      );
    }

    const token = jwt.sign(
      {
        _id: checkUser._id,
        email: checkUser.email,
      },
      environment.jwt.secret,
      { expiresIn: environment.jwt.expiredIn }
    );

    const userData = checkUser.toObject();
    delete userData.password;

    const data = {
      message: "user login successfully",
      token,
      data: userData,
    };

    return sendSuccessResponse(res, data);
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};
