var express = require("express");
var router = express.Router();
const { body, check } = require("express-validator");
const { validate } = require("../middleware");
const controller = require("../controllers");

/* Add New category */
router.put(
  "/addCategory/:categoryName",
  validate([
    check("categoryName")
      .not()
      .isEmpty()
      .isLength({
        min: 1,
      })
      .withMessage("Please provide the Category Name."),
  ]),
  controller.addCategory
);

/* Add New Sub Category */
router.put(
  "/addSubCategory/:categoryID/:subCategoryName",
  validate([
    check("categoryID")
      .not()
      .isEmpty()
      .withMessage("Please provide the Category ID."),
    check("subCategoryName")
      .not()
      .isEmpty()
      .isLength({
        min: 1,
      })
      .withMessage("Please provide the Sub Category Name."),
  ]),
  controller.addSubCategory
);

/* Add New Brand */
router.put(
  "/addBrand/:categoryID/:subCategoryID/:brandName",
  validate([
    check("categoryID")
      .not()
      .isEmpty()
      .withMessage("Please provide the Category ID."),
    check("subCategoryID")
      .not()
      .isEmpty()
      .withMessage("Please provide the Sub Category ID."),
    check("brandName")
      .not()
      .isEmpty()
      .isLength({
        min: 1,
      })
      .withMessage("Please provide the Brand Name."),
  ]),
  controller.addBrand
);

/* GET Server Status */
router.get("/", function (req, res, next) {
  res.status(200).json({ title: "API Running" });
});

module.exports = router;
