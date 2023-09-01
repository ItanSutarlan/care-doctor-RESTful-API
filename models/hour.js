'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.HourDetail, {foreignKey: "HourId", as: "intervals"})
    }
  }
  Hour.init(
    {
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Hour time is required',
          },
          notEmpty: {
            msg: 'Hour time is required',
          },
        },
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Hour date is required',
          },
          notEmpty: {
            msg: 'Hour date is required',
          },
        },
      },
      ScheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'ScheduleId is required',
          },
          notEmpty: {
            msg: 'ScheduleId is required',
          },
        },
      }
    },
    {
      sequelize,
      modelName: 'Hour',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return Hour;
};
