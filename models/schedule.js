'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Hour, {foreignKey: "ScheduleId", as: "times"})
      this.belongsTo(models.Doctor, {foreignKey: "DoctorId", as: "doctor"})
    }
  }
  Schedule.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Schedule date is required',
          },
          notEmpty: {
            msg: 'Schedule date is required',
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
      }
    },
    {
      sequelize,
      modelName: 'Schedule',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return Schedule;
};
