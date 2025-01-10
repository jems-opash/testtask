var express = require("express");
var router = express.Router();
const apiRoutes = require("./api");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/api", apiRoutes);

module.exports = router;
