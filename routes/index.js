var express = require("express");
var router = express.Router();
const { body, check } = require("express-validator");
const { validate, checkProductExist } = require("../middleware");
const controller = require("../controllers");
const multer = require("multer");

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

/* Add New Product */
router.post(
  "/addProduct",
  multer({
    dest: "assets/productImages",
    limits: { fieldSize: 100 * 1024 * 1024 },
  }).single("proImage"),
  checkProductExist,
  controller.addProduct
);

/* Update Stock */
router.put(
  "/updateStock/:count/:operationType/:serialNo",
  validate([
    check("count").not().isEmpty().withMessage("Please provide the New Count."),
    check("operationType")
      .not()
      .isEmpty()
      .withMessage(
        "Please provide the Operation Type. 1 : Miscellaneous Transaction 2: Miscellaneous Issue"
      ),
    check("serialNo")
      .not()
      .isEmpty()
      .withMessage("Please provide the Serial Number"),
  ]),
  controller.updateStock
);
// Add product To Scrap
router.put(
  "/pushToScrap/:serialNo",
  validate([
    check("serialNo")
      .not()
      .isEmpty()
      .withMessage("Please provide the Serial Number"),
  ]),
  controller.pushToScrap
);

/* Get Stock Valuation */
router.get(
  "/getValuation/:valuationBy/:valuationID",
  validate([
    check("valuationBy")
      .not()
      .isEmpty()
      .withMessage(
        "Please provide the Valuation By: Like category, subCategory, or brand"
      ),
    check("valuationID")
      .not()
      .isEmpty()
      .withMessage("Please provide the Valuation ID"),
  ]),
  controller.getValuation
);
/* Get Product Stock Valuation */
router.get(
  "/getProductValuation/:serialNo",
  validate([
    check("serialNo")
      .not()
      .isEmpty()
      .withMessage("Please provide the Serial Number"),
  ]),
  controller.getProductValuation
);

/* Get Stock */
router.get(
  "/getStock/:stockBy/:id",
  validate([
    check("stockBy")
      .not()
      .isEmpty()
      .withMessage(
        "Please provide the Stock By: Like category, subCategory, or brand"
      ),
    check("id").not().isEmpty().withMessage("Please provide the ID"),
  ]),
  controller.getStock
);

/* Get Product Stock */
router.get(
  "/getProductStock/:serialNo",
  validate([
    check("serialNo")
      .not()
      .isEmpty()
      .withMessage("Please provide the Serial Number"),
  ]),
  controller.getProductStock
);
/* GET Server Status */
router.get("/", function (req, res, next) {
  res.status(200).json({ title: "API Running" });
});

module.exports = router;
