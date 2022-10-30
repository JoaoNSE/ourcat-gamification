"use strict";
const { Model } = require("sequelize");

/**
 *
 * @param {import('sequelize')} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
function instantiateModel(sequelize, DataTypes) {
  class UserCourseModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     * @param {Map<String, import('sequelize').Model>} models
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Course, {
        through: models.UserCourseModules,
      });
      models.Course.belongsToMany(models.User, {
        through: models.UserCourseModules,
      });
      models.Module.belongsToMany(models.Course, {
        through: models.UserCourseModules,
      });

      models.Course.hasMany(models.UserCourseModules);
      models.UserCourseModules.belongsTo(models.Course);

      models.Module.hasMany(models.UserCourseModules);
      models.UserCourseModules.belongsTo(models.Module);

      models.User.hasMany(models.UserCourseModules);
      models.UserCourseModules.belongsTo(models.User);
    }
  }
  UserCourseModules.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      courseId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Courses",
          key: "id",
        },
      },
      moduleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Modules",
          key: "id",
        },
      },
      completed: DataTypes.INTEGER,
      earnedXp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserCourseModules",
    }
  );
  return UserCourseModules;
}

module.exports = instantiateModel;
