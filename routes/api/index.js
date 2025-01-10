var express = require("express");
var router = express.Router();
const authRoutes = require("./auth");
const expenseRoutes = require("./expense");

const authentication = require("../../middleware/authentication");

// Public Routes
router.use("/auth", authRoutes);

// Middleware to check token
router.use(authentication);

// Secure Routes
router.use("/expenses", expenseRoutes);

module.exports = router;
