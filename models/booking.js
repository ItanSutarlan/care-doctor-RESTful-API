'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.FamilyMember, { foreignKey: "FamilyMemberId" })
      this.belongsTo(models.Doctor, {foreignKey: "DoctorId" })
      this.hasOne(models.History, {foreignKey: "BookingId" })
    }
  }
  Booking.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'type is required',
          },
          notEmpty: {
            msg: 'type is required',
          },
        },
      },
      bookingCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'BookingCode is required',
          },
          notEmpty: {
            msg: 'BookingCode is required',
          },
        },
      },
      complaint: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bookingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      complaint: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      FamilyMemberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'FamilyMemberId is required',
          },
          notEmpty: {
            msg: 'FamilyMemberId is required',
          },
        },
      },
      DoctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'DoctorId is required',
          },
          notEmpty: {
            msg: 'DoctorId is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return Booking;
};
