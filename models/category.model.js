module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "category",
    {
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

  return Category;
};
