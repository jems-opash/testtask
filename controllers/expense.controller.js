const ExpenseModel = require("../models/expense.model");
const moment = require("moment");

const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { getPagination, getPaginationData } = require("../utils/fn");

exports.getAllExpense = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const { limit, offset } = getPagination(page, size);
    const expense = await ExpenseModel.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    let count = await ExpenseModel.countDocuments({});

    return sendSuccessResponse(
      res,
      getPaginationData(
        { docs: { expense, totalExpense: count } },
        page,
        limit,
        count
      )
    );
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    let userId = req.user._id;

    const expense = await ExpenseModel.create({
      title,
      amount,
      category,
      userId,
    });

    return sendSuccessResponse(res, {
      message: "expense added successfully !!",
      data: expense,
    });
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};

exports.editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, amount, category, date } = req.body;

    let userId = req.user._id;

    const checkExpense = await ExpenseModel.findOne({
      _id: id,
    });
    if (!checkExpense) {
      return sendErrorResponse(res, { message: "Expense not found !!" }, 404);
    }

    if (userId !== checkExpense.userId.toString()) {
      return sendErrorResponse(
        res,
        { message: "You are not able to edit !!" },
        403
      );
    }

    date = date && moment(new Date(date)).startOf("day").toDate();

    const editedExpense = await ExpenseModel.findByIdAndUpdate(
      id,
      {
        ...(title ? { title } : {}),
        ...(amount ? { amount } : {}),
        ...(category ? { category } : {}),
        ...(date ? { date } : {}),
      },
      {
        runValidators: true,
        new: true,
      }
    );

    return sendSuccessResponse(res, {
      message: "Expense details edited successfully !!",
      data: editedExpense,
    });
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    let userId = req.user._id;

    const checkExpense = await ExpenseModel.findOne({
      _id: id,
    });

    if (!checkExpense) {
      return sendErrorResponse(res, { message: "Expense not found !!" }, 404);
    }

    if (userId !== checkExpense.userId.toString()) {
      return sendErrorResponse(
        res,
        { message: "You are not able to delete !!" },
        403
      );
    }

    await ExpenseModel.findOneAndDelete({
      _id: id,
      userId,
    });

    return sendSuccessResponse(res, {
      message: "Expense deleted successfully !!",
    });
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};

exports.getSingleExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await ExpenseModel.findOne({
      _id: id,
    });
    if (!expense) {
      return sendErrorResponse(res, { message: "Expense not exists !" }, 400);
    }
    return sendSuccessResponse(res, {
      message: "Expense fetched successfully !!",
      data: expense,
    });
  } catch (error) {
    sendErrorResponse(res, { message: error.message });
  }
};

exports.getExpenseGroupByCategory = async (req, res) => {
  try {
    const expenses = await ExpenseModel.aggregate([
      {
        $group: {
          _id: "$category",
          data: {
            $push: {
              title: "$title",
              amount: "$amount",
              date: "$date",
              userId: "$userId",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return sendSuccessResponse(res, {
      message: "Expense fetched successfully !!",
      data: expenses,
    });
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};

exports.getExpenseReport = async (req, res) => {
  try {
    const { start, end } = req.query;

    console.log(start, end);

    if (!start || !end) {
      return sendErrorResponse(
        res,
        "Please provide both start and end dates!",
        400
      );
    }

    const startDate = moment(new Date(start)).startOf("day").toDate();
    const endDate = moment(new Date(end)).endOf("day").toDate();

    const expenses = await ExpenseModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
    ]);

    return sendSuccessResponse(res, {
      message: "Expenses fetched successfully!",
      data: expenses,
    });
  } catch (error) {
    return sendErrorResponse(res, { message: error.message });
  }
};
