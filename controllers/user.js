const { User, FamilyMember } = require('../models');

class UserController {
  static async getPoints(req, res, next) {
    try {
      const {id} = req.user;
      const user = await User.findByPk(id, {
        attributes: ["id", "points"],
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getFamilyMembers(req, res, next) {
    try {
      const {id: UserId} = req.user;
      const families = await FamilyMember.findAll({
        where: {
          UserId
        },
        attributes: ["id", "firstName", "lastName", "relationship"],
      });
      res.status(200).json(families.map(family => ({ id: family.id, fullName: `${family.firstName} ${family?.lastName}`, relationship: family.relationship })));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
