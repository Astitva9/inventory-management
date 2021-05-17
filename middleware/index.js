const { check, validationResult, body } = require("express-validator");
const db = require("../models");
const product = db.product;

module.exports = {
  // Request param validations
  validate: (validations) => {
    return async (req, res, next) => {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      res.status(422).json({ errors: errors.array() });
    };
  },
  // Check for the product if already exist
  checkProductExist: async (req, res, next) => {
    product
      .findOne({
        where: {
          serial_no: req.body.serialNo,
        },
      })
      .then((result) => {
        if (result) {
          return res.status(400).json({
            status: false,
            message: `Product with serial Number: ${req.body.serialNo} already exists`,
          });
        }
        next();
      });
  },
};
