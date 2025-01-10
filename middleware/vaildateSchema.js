const Joi = require("joi");
const { sendErrorResponse } = require("../utils/response");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return sendErrorResponse(
      res,
      {
        message: "Validation error",
        details: error.details.map((err) => err.message),
      },
      400
    );
  }
  next();
};

module.exports = validate;
