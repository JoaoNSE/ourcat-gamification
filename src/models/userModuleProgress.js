"use strict";
const { Model } = require("sequelize");

/**
 *
 * @param {import('sequelize')} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
function instantiateModel(sequelize, DataTypes) {
    class UserModuleProgress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         * @param {Map<String, import('sequelize').Model>} models
         */
        static associate(models) {
            // define association here
            // models.User.belongsToMany(models.Module, {
            //     through: models.UserModuleProgress,
            // });
            // models.Module.belongsToMany(models.User, {
            //     through: models.UserModuleProgress,
            // });
            // models.Chapter.belongsToMany(models.Module, {
            //     through: models.UserModuleProgress,
            // });
            // models.Module.hasMany(models.UserModuleProgress);
            // models.UserModuleProgress.belongsTo(models.Module);
            // models.Chapter.hasMany(models.UserModuleProgress);
            // models.UserModuleProgress.belongsTo(models.Chapter);
            // models.User.hasMany(models.UserModuleProgress);
            // models.UserModuleProgress.belongsTo(models.User);
        }
    }
    UserModuleProgress.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
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
            chapterId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Chapters",
                    key: "id",
                },
            },
            completed: DataTypes.INTEGER,
            earnedXp: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "UserModuleProgress",
        }
    );
    return UserModuleProgress;
}

module.exports = instantiateModel;
