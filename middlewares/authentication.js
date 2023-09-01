const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

module.exports = async (req, _, next) => {
  try {
    const access_token = req.headers['authorization']?.split(' ')[1];;

    const { id } = verifyToken(access_token);
    const user = await User.findByPk(id);
  
    if (!user) {
      throw { name: 'Invalid token' }
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
