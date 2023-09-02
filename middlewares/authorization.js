const { Booking, FamilyMember, sequelize } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId, {
      attributes: [
        [sequelize.literal('"FamilyMember"."UserId"'), "UserId"],
      ],
      include: {
        model: FamilyMember,
        attributes: [],
      },
    });
    if (!booking) {
      throw { name: 'Data not found' };
    }

    const { id } = req.user;
    const { UserId } = booking.dataValues
    if (id !== UserId) {
      throw { name: 'You are not authorized' };
    }

    next();
  } catch (error) {
    next(error);
  }
};
