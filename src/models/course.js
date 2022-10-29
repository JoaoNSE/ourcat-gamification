"use strict";
const { Model } = require("sequelize");

/**
 *
 * @param {import('sequelize')} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
function instantiateModel(sequelize, DataTypes) {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     * @param {Map<String, import('sequelize').Model>} models
     */
    static associate(models) {
      // define association here
      models.Course.hasMany(models.Module, { foreignKey: "courseId" });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      badgeImageRef: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
}

module.exports = instantiateModel;
