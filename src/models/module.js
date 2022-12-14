"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Module.belongsTo(models.Course);
    }
  }
  Module.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      experience: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Module",
    }
  );
  return Module;
};
