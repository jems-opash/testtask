var express = require("express");
const expenseCtrl = require("../../controllers/expense.controller");
const validate = require("../../middleware/vaildateSchema");
const {
  addExpenseSchema,
  editExpenseSchema,
} = require("../../schema/expense.schema");
var router = express.Router();

router.get("/", expenseCtrl.getAllExpense);

router.post("/", validate(addExpenseSchema), expenseCtrl.addExpense);

router.get("/report", expenseCtrl.getExpenseReport);

router.get("/summary", expenseCtrl.getExpenseGroupByCategory);

router.patch("/:id", validate(editExpenseSchema), expenseCtrl.editExpense);

router.delete("/:id", expenseCtrl.deleteExpense);

router.get("/:id", expenseCtrl.getSingleExpense);


module.exports = router;
