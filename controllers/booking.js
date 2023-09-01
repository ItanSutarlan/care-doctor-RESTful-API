const { Booking, Hospital, History, Specialization, Doctor, FamilyMember, sequelize } = require('../models');
const { Op } = require("sequelize");

class BookingController {
  static async getAllBookings(req, res, next) {
    try {
      const hospitals = await Booking.findAll({
        attributes: [
          'id',
          [sequelize.literal('"Doctor"."fullName"'), 'doctor'],
          'bookingDate',
          'bookingTime',
          [sequelize.literal('"History"."status"'), 'status'],
          [sequelize.literal('"Doctor->Hospital"'), 'hospital'],
          [sequelize.literal('"Doctor"."imgUrl"'), 'imgUrl'],
        ],
        include: [
          {
            model: Doctor,
            attributes: [], 
            include: [
              {
                model: Hospital,
                attributes: ["name"], 
              },
            ],
          },
          {
            model: History,
            attributes: [], 
            where: {
              status: 'terkonfirmasi', 
            },
          },
        ],
      });
      res.status(200).json(hospitals);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBookingHistories(req, res, next) {
    try {
      const hospitals = await Booking.findAll({
        attributes: [
          'id',
          [sequelize.literal('"Doctor"."fullName"'), 'doctor'],
          'bookingDate',
          'bookingTime',
          [sequelize.literal('"History"."status"'), 'status'],
          [sequelize.literal('"Doctor->Hospital"'), 'hospital'],
          [sequelize.literal('"Doctor"."imgUrl"'), 'imgUrl'],
        ],
        include: [
          {
            model: Doctor,
            attributes: [], 
            include: [
              {
                model: Hospital,
                attributes: ["name"], 
              },
            ],
          },
          {
            model: History,
            attributes: [], 
            where: {
              status: {
                [Op.ne]: 'terkonfirmasi'
              }, 
            },
          },
        ],
      });
      res.status(200).json(hospitals);
    } catch (error) {
      next(error);
    }
  }

  static async getBookingById(req, res, next) {
    try {
      const { bookingId } = req.params;

      const booking = await Booking.findAll({
        attributes: [
          'id',
          [sequelize.literal('"FamilyMember"."firstName" || \' \' || "FamilyMember"."lastName"'), 'fullName'],
          [sequelize.literal('"Doctor"."fullName"'), 'doctor'],
          [sequelize.literal('"Doctor->specialization"."name"'), 'specialization'],
          [sequelize.literal('"Doctor->Hospital"."name"'), 'hospital'],
          'bookingDate',
          'bookingTime',
          'bookingCode',
          'complaint',
          [sequelize.literal('"History"."status"'), 'status'],
          [sequelize.literal('"Doctor"."imgUrl"'), 'imgUrl'],
        ],
        include: [
          {
            model: Doctor,
            attributes: [], 
            include: [
              {
                model: Specialization,
                attributes: [], 
                as: 'specialization', 
              },
              {
                model: Hospital,
                attributes: [], // 
                as: 'Hospital', // 
              },
            ],
          },
          {
            model: FamilyMember,
            attributes: [], // Include only the specified columns above
          },
          {
            model: History,
            attributes: [], // Include only the specified columns above
          },
        ],
        where: {
          id: bookingId, // Filter by the bookingId from the query parameter
        },
      });
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookingController;
