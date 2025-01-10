var express = require("express");
const authCtrl = require("../../controllers/auth.controller");
const validate = require("../../middleware/vaildateSchema");
const { registerSchema, loginSchema } = require("../../schema/auth.schema");
var router = express.Router();

router.post("/register", validate(registerSchema), authCtrl.signup);

router.post("/login",validate(loginSchema), authCtrl.login);

module.exports = router;
