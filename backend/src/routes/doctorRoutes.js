const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// POST /api/doctors - Add a new doctor
router.post('/', doctorController.addDoctor);

// GET /api/doctors - Get doctors list with filters and pagination
router.get('/', doctorController.getDoctors);

module.exports = router; 