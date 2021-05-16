const db = require("../models");
const Op = db.Sequelize.Op;
const category = db.category;
const subCategory = db.subCategory;
const brands = db.brands;
const product = db.product;
module.exports = {
  addCategory: async (req, res) => {
    try {
      const { categoryName } = req.params;
      const result = await category.create({
        name: categoryName.trim(),
        is_active: true,
      });
      if (result) {
        return res.status(200).json({
          status: true,
          message: "Successfully Stored",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In add category: ${error.message}`,
      });
    }
  },
  addSubCategory: async (req, res) => {
    try {
      const { categoryID, subCategoryName } = req.params;
      const result = await subCategory.create({
        category_id: categoryID,
        name: subCategoryName.trim(),
        is_active: true,
      });
      if (result) {
        return res.status(200).json({
          status: true,
          message: "Successfully Stored",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In add sub category: ${error.message}`,
      });
    }
  },
  addBrand: async (req, res) => {
    try {
      const { categoryID, subCategoryID, brandName } = req.params;
      const result = await brands.create({
        category_id: categoryID,
        sub_category_id: subCategoryID,
        name: brandName.trim(),
        is_active: true,
      });
      if (result) {
        return res.status(200).json({
          status: true,
          message: "Successfully Stored",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In add Brand: ${error.message}`,
      });
    }
  },
  addProduct: async (req, res) => {
    try {
      const body = req.body;
      const {
        categoryID,
        subCategoryID,
        brandID,
        serialNo,
        costPrice,
        sellingPrice,
      } = req.body;
      if (
        !categoryID ||
        !subCategoryID ||
        !brandID ||
        !serialNo ||
        !costPrice ||
        !sellingPrice
      ) {
        return res.status(404).json({
          status: false,
          message: "Mandatory Field Missing",
        });
      }

      const file = req.file;

      let imageName = "";
      if (file.path) {
        imageName = file.originalname;
      }

      const result = await product.create({
        category_id: body.categoryID,
        sub_category_id: body.subCategoryID,
        brand_id: body.brandID,
        serial_no: body.serialNo,
        name: body.proName,
        image_url: imageName,
        description: body.desc || "",
        unit_of_measure: body.unitOfMeasure || "",
        tags: body.tags || "",
        cost_price: body.costPrice,
        selling_price: body.sellingPrice,
        lead_time: body.leadTime || 0,
        min_order_count: body.minOrderCount || 0,
        max_order_count: body.maxOrderCount || 0,
        min_quantity: body.minQuantity || 0,
        max_quantity: body.maxQuantity || 0,
        expiry_date: body.expiryDate || "",
        length: body.proLength || 0,
        breadth: body.proBreadth || 0,
        height: body.proHeight || 0,
        size: body.proSize || "",
        discount_percent: body.discountPercent || 0,
        discount_amount: body.discountAmount || 0,
        is_active: true,
      });
      if (result) {
        return res.status(200).json({
          status: true,
          message: "Successfully Stored",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In add Product: ${error.message}`,
      });
    }
  },
  updateStock: async (req, res) => {
    try {
      const { count, operationType, serialNo } = req.params;

      const proDetails = JSON.parse(
        JSON.stringify(
          await product.findOne({
            where: {
              serial_no: serialNo,
            },
          })
        )
      );
      let newQuantity = 0;
      switch (parseInt(operationType)) {
        case 1:
          newQuantity = parseInt(proDetails.quantity) + parseInt(count);
          break;
        case 2:
          newQuantity = parseInt(proDetails.quantity) - parseInt(count);
          break;
        default:
          break;
      }

      if (operationType === 2 && proDetails.quantity <= 0) {
        return res.status(400).json({
          status: false,
          message: "Operation can not be executed as quantity is Zero",
        });
      }

      const result = await product.update(
        { quantity: parseInt(newQuantity) },
        {
          where: {
            serial_no: serialNo,
          },
        }
      );

      if (result && newQuantity <= proDetails.min_quantity) {
        // Send notification email to admin for shortage of stock
        return res.status(200).json({
          status: true,
          message:
            "Successfully Updated. Please Add stock its below then Minimum requirement",
        });
      } else if (result && newQuantity <= 0) {
        // Send notification email to admin for shortage of stock
        return res.status(200).json({
          status: true,
          message: "Successfully Updated.Please add stock Stock is zero",
        });
      } else if (result) {
        return res.status(200).json({
          status: true,
          message: "Successfully Updated",
        });
      }

      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In Update stock: ${error.message}`,
      });
    }
  },
  pushToScrap: async (req, res) => {
    try {
      const { serialNo } = req.params;
      const result = await product.update(
        { is_scrapped: true },
        {
          where: {
            serial_no: serialNo,
          },
        }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Successfully Pushed to scrap",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In add Brand: ${error.message}`,
      });
    }
  },
  getValuation: async (req, res) => {
    try {
      const { valuationBy, valuationID } = req.params;
      let condition = "";
      switch (valuationBy) {
        case "category":
          condition = {
            category_id: valuationID,
          };
          break;
        case "subCategory":
          condition = {
            sub_category_id: valuationID,
          };
          break;
        case "brand":
          condition = {
            brand_id: valuationID,
          };
          break;

        default:
          break;
      }

      if (condition === "") {
        return res.status(404).json({
          status: false,
          message: "Invalid Valuation By Provided",
        });
      }

      const result = JSON.parse(
        JSON.stringify(
          await product.findAll({
            where: condition,
          })
        )
      );

      let valuation = 0;
      result.map(({ quantity, cost_price }) => {
        valuation += parseInt(quantity) * parseInt(cost_price);
      });

      if (result) {
        return res.status(200).json({
          status: true,
          totalValuation: valuation,
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In Get Valuation: ${error.message}`,
      });
    }
  },
  getProductValuation: async (req, res) => {
    try {
      const { serialNo } = req.params;

      const result = JSON.parse(
        JSON.stringify(
          await product.findAll({
            where: {
              serial_no: serialNo,
            },
          })
        )
      );

      let valuation = 0;
      result.map(({ quantity, cost_price }) => {
        valuation += parseInt(quantity) * parseInt(cost_price);
      });

      if (result) {
        return res.status(200).json({
          status: true,
          totalValuation: valuation,
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In Get Product Valuation: ${error.message}`,
      });
    }
  },
  getStock: async (req, res) => {
    try {
      const { stockBy, id } = req.params;
      let condition = "";
      switch (stockBy) {
        case "category":
          condition = {
            category_id: id,
          };
          break;
        case "subCategory":
          condition = {
            sub_category_id: id,
          };
          break;
        case "brand":
          condition = {
            brand_id: id,
          };
          break;

        default:
          break;
      }

      if (condition === "") {
        return res.status(404).json({
          status: false,
          message: "Invalid Stock By Provided",
        });
      }

      const result = JSON.parse(
        JSON.stringify(
          await product.findAll({
            attributes: ["name", "quantity"],
            where: condition,
          })
        )
      );

      if (result) {
        return res.status(200).json({
          status: true,
          totalValuation: result,
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In Get Stock: ${error.message}`,
      });
    }
  },
  getProductStock: async (req, res) => {
    try {
      const { serialNo } = req.params;

      const result = JSON.parse(
        JSON.stringify(
          await product.findAll({
            attributes: ["name", "quantity"],
            where: { serial_no: serialNo },
          })
        )
      );

      if (result) {
        return res.status(200).json({
          status: true,
          totalValuation: result,
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: false,
        message: `Error Occurred In Get Product Valuation: ${error.message}`,
      });
    }
  },
};
