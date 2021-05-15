module.exports = (sequelize, Sequelize) => {
  const Brands = sequelize.define(
    "brand",
    {
      category_id: {
        type: Sequelize.INTEGER,
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        required: true,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return Brands;
};
