const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

router.get('/points', UserController.getPoints);
router.get('/family-members', UserController.getFamilyMembers);

module.exports = router;
