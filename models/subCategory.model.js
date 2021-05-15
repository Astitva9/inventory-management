module.exports = (sequelize, Sequelize) => {
  const SubCategory = sequelize.define(
    "sub-category",
    {
      category_id: {
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

  return SubCategory;
};
