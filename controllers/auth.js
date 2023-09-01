const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AuthController {
  static async register(req, res, next) {
    try {
      const { firstName, email, password, phoneNumber } = req.body;

      const result = await User.create({
          firstName,
          email,
          password,
          phoneNumber,
        });

      res.status(201).json({
        id: result.id,
        email: result.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { phoneNumber, password } = req.body;

      const result = await User.findOne({
        where: {
          phoneNumber,
        }
      });

      if (!result) {
        throw { name: 'Invalid email/password' };
      }

      const isMatch = comparePassword(password, result.password);
      if (!isMatch) {
        throw { name: 'Invalid email/password' };
      }

      const access_token = generateToken({
        id: result.id,
        email: result.email,
      });

      res.status(200).json({
        access_token,
        firstName: result.firstName,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
