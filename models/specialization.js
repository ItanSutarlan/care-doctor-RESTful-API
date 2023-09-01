'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Hospital, { foreignKey: "HospitalId" })
    }
  }
  Specialization.init(
    {
      name: {
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
      modelName: 'Specialization',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return Specialization;
};
