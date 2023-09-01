'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FamilyMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FamilyMember.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'firstName is required',
          },
          notEmpty: {
            msg: 'firstName is required',
          },
        },
      },
      lastName: DataTypes.STRING,
      relationship: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Relationship is required',
          },
          notEmpty: {
            msg: 'Relationship is required',
          },
        },
      },
      gender: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Gender is required',
          },
          notEmpty: {
            msg: 'Gender is required',
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Date of birth is required',
          },
          notEmpty: {
            msg: 'Date of birth is required',
          },
        },
      },
      placeOfBirth: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Place of birth is required',
          },
          notEmpty: {
            msg: 'Place of birth is required',
          },
        },
      },
      citizenship: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Citizenship is required',
          },
          notEmpty: {
            msg: 'Citizenship is required',
          },
        },
      },
      identificationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Identification Number is required',
          },
          notEmpty: {
            msg: 'Identification Number is required',
          },
        },
      },
      bloodType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      education: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      religion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maritalStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'UserId is required',
          },
          notEmpty: {
            msg: 'UserId is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'FamilyMember',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return FamilyMember;
};
