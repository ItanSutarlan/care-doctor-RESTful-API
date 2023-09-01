'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HourDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HourDetail.init(
    {
      timeSlot: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'timeSlot is required',
          },
          notEmpty: {
            msg: 'timeSlot is required',
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      HourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'HourId is required',
          },
          notEmpty: {
            msg: 'HourId is required',
          },
        },
      }
    },
    {
      sequelize,
      modelName: 'HourDetail',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return HourDetail;
};
