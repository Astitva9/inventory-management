const db = require("../models");
const Op = db.Sequelize.Op;
const category = db.category;
const subCategory = db.subCategory;
const brands = db.brands;
module.exports = {
  addCategory: async (req, res) => {
    try {
      const { categoryName } = req.params;
      console.log({ categoryName });
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
        status: true,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: true,
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
        status: true,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: true,
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
        status: true,
        message: "Something Went wrong",
      });
    } catch (error) {
      // store log as well.
      return res.status(500).json({
        status: true,
        message: `Error Occurred In add Brand: ${error.message}`,
      });
    }
  },
};
