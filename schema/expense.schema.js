const Joi = require("joi");

exports.addExpenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string()
    .required()
    .valid("food", "travel", "shopping", "utilities", "other"),
});

exports.editExpenseSchema = Joi.object({
  title: Joi.string(),
  amount: Joi.number(),
  category: Joi.string().valid("food", "travel", "shopping", "utilities", "other"),
  date: Joi.date(),
});
