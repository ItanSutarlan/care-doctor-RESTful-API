'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Specialization, { foreignKey: "SpecializationId", as: "specialization" })
      this.hasMany(models.Schedule, {foreignKey: "DoctorId", as: "dates"})
      this.belongsTo(models.Hospital, { foreignKey: "HospitalId" })
    }
  }
  Doctor.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is required',
          },
          notEmpty: {
            msg: 'Name is required',
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'gender is required',
          },
          notEmpty: {
            msg: 'gender is required',
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SpecializationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'SpecializationId is required',
          },
          notEmpty: {
            msg: 'SpecializationId is required',
          },
        },
      },
      HospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'HospitalId is required',
          },
          notEmpty: {
            msg: 'HospitalId is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Doctor',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return Doctor;
};
