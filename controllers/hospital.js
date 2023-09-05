const { Hospital, Specialization, Doctor, Schedule, Hour, HourDetail, sequelize } = require('../models');
const { Op } = require("sequelize");
const dayToDate = require('../helpers/converter');
const schedule = require('../models/schedule');

class HospitalController {
  static async getHospitals(req, res, next) {
    try {
      const hospitals = await Hospital.findAll();
      res.status(200).json(hospitals);
    } catch (error) {
      next(error);
    }
  }

  static async getSpecializations(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const specializations = await Specialization.findAll({
        where: {
          HospitalId: hospitalId
        },
        attributes: {
          exclude: ["HospitalId"]
        },
      });
      res.status(200).json(specializations);
    } catch (error) {
      next(error);
    }
  }

  static async getAllDoctors(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const { search: searchQuery = "" } = req.query;
      const doctors = await Doctor.findAll({
        include: [
          {
            model: Schedule,
            as: "dates",
            attributes: {
              exclude: ["DoctorId"]
            },
            include: [
              {
                model: Hour,
                attributes: {
                  exclude: ["ScheduleId"]
                },
                as: "times",
              },
            ]
          },
          {
            model: Specialization,
            attributes: [],
            as: "specialization",
          }
        ],
        attributes: [
          "id",
          "fullName",
          "gender",
          "imgUrl",
          [sequelize.literal('"specialization"."name"'), 'specializationName'], 
        ],
        where: {
          [Op.and]: [
            { HospitalId: hospitalId },
            {
              [Op.or]: [
                { fullName: { [Op.iLike]: `%${searchQuery}%` } }, 
                sequelize.literal('"specialization"."name" ILIKE :searchQuery'),
              ],
            },
          ]
        },
        replacements: { searchQuery: `%${searchQuery}%` }, 
      });
      res.status(200).json(doctors);
    } catch (error) {
      next(error);
    }
  }

  static async getAllFilteredDoctors(req, res, next) {
    const { hospitalId } = req.params;
    const { specialization_id: specializationId, day, start_time: startTime, end_time: endTime, gender } = req.query;
    const whereCondition = {
      HospitalId: hospitalId
    };

    if (specializationId) {
      whereCondition.SpecializationId = {
        [Op.in]: specializationId.split(','), 
      };
    }
  
    if (day) {
      whereCondition['$dates.date$'] = dayToDate(day); 
    }
  
    if (startTime && endTime) {
      whereCondition[Op.and] = [
        {
          '$dates.times.startTime$': {
            [Op.lte]: endTime,
          },
        },
        {
          '$dates.times.endTime$': {
            [Op.gt]: startTime,
          },
        },
      ];
    }
  
    if (gender) {
      whereCondition.gender = gender;
    }
  
    try {
      const doctors = await Doctor.findAll({
        where: whereCondition,
        attributes: [
          "id",
          "fullName",
          "gender",
          "imgUrl",
          [sequelize.literal('"specialization"."name"'), 'specializationName'], 
        ],
        include: [
          {
            model: Specialization,
            attributes: [],
            as: "specialization"
          },
          {
            model: Schedule,
            attributes: {
              exclude: ["DoctorId"]
            },
            as: "dates",
            include: [
              {
                model: Hour,
                as: "times",
                attributes: {
                  exclude: ["ScheduleId"]
                },
              },
            ],
          },
        ],
      });

      res.status(200).json(doctors);
    } catch (error) {
      next(error);
    }
  }

  static async getTimeSlots(req, res, next) {
    const { hospitalId, doctorId } = req.params;
    const { start_date: startDate, end_date: endDate } = req.query;
    const whereCondition = {
      HospitalId: hospitalId,
      id: doctorId
    };
  
    if (startDate && endDate) {
      whereCondition['$dates.date$'] = {
        [Op.between]: [startDate, endDate]
      }
    }
    
    try {
      const doctor = await Doctor.findOne({
        where: whereCondition,
        include: [
          {
            model: Schedule,
            as: "dates",
            attributes: [
              "id",
              "date",
            ],
            include: [
              {
                model: Doctor,
                as: "doctor",
                attributes: [],
              },
              {
                model: Hour,
                attributes: {
                  exclude: ["ScheduleId"]
                },
                as: "times",
                include: [
                  {
                    model: HourDetail,
                    as: "intervals",
                    attributes: {
                      exclude: ["HourId"]
                    },
                  },
                ],
              },
            ],
          },
          {
            model: Hospital,
            attributes: [],
          },
          {
            model: Specialization,
            as: "specialization",
            attributes: [],
          },
        ],
        attributes: [
          "id",
          "fullName",
          "imgUrl",
          [sequelize.literal('"specialization"."name"'), 'specializationName'], 
          [sequelize.literal('"Hospital"."name"'), "hospitalName"],
        ],
      });

      res.status(200).json(doctor);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HospitalController;
