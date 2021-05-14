var express = require("express");
var router = express.Router();
const { body, check } = require("express-validator");
const { validate } = require("../middleware");
const controller = require("../controllers");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ title: "Express" });
});

module.exports = router;
