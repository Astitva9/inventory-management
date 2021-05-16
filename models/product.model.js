module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define(
    "product",
    {
      category_id: {
        type: Sequelize.INTEGER,
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
      },
      brand_id: {
        type: Sequelize.INTEGER,
      },
      serial_no: {
        type: Sequelize.STRING,
        required: true,
        comment: "Unique Identity Number",
      },
      name: {
        type: Sequelize.STRING,
        required: true,
      },
      image_url: {
        type: Sequelize.STRING,
        comment: "Unique Identity Number",
      },
      description: {
        type: Sequelize.TEXT,
        required: true,
      },
      unit_of_measure: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.STRING,
      },
      cost_price: {
        type: Sequelize.FLOAT,
        required: true,
      },
      selling_price: {
        type: Sequelize.FLOAT,
        required: true,
      },
      lead_time: {
        type: Sequelize.INTEGER,
        comment: "Expected delivery Time in days",
      },
      min_order_count: {
        type: Sequelize.INTEGER,
      },
      max_order_count: {
        type: Sequelize.INTEGER,
      },
      min_quantity: {
        type: Sequelize.INTEGER,
      },
      max_quantity: {
        type: Sequelize.INTEGER,
      },
      expiry_date: {
        type: Sequelize.DATE,
      },
      length: {
        type: Sequelize.FLOAT,
      },
      breadth: {
        type: Sequelize.FLOAT,
      },
      height: {
        type: Sequelize.FLOAT,
      },
      size: {
        type: Sequelize.STRING,
      },
      discount_percent: {
        type: Sequelize.FLOAT,
      },
      discount_amount: {
        type: Sequelize.FLOAT,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        required: true,
        default: true,
      },
      is_scrapped: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  return Products;
};
