const express = require('express');
const HospitalController = require('../controllers/hospital');
const router = express.Router();

router.get('/', HospitalController.getHospitals);
router.get('/:hospitalId/specializations', HospitalController.getSpecializations);
router.get('/:hospitalId/doctors', HospitalController.getAllDoctors);
router.get('/:hospitalId/doctors/filter', HospitalController.getAllFilteredDoctors);
router.get('/:hospitalId/doctors/:doctorId/time-slots', HospitalController.getTimeSlots);

module.exports = router;
