'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'status is required',
          },
          notEmpty: {
            msg: 'status is required',
          },
        },
      },
      BookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'BookingId is required',
          },
          notEmpty: {
            msg: 'BookingId is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'History',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return History;
};
