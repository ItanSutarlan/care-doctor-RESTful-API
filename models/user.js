'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email must be unique',
        },
        validate: {
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Invalid email format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password is required',
          },
          len: 4,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Phone Number is required',
          },
          notEmpty: {
            msg: 'Phone Number is required',
          },
        },
      },
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  User.beforeCreate((user) => {
    user.points = 0
    user.password = hashPassword(user.password);
  });
  return User;
};
