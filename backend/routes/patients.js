const express = require('express');
const Patient = require('../models/Patient');
const Consultation = require('../models/Consultation');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/patients
// @desc    Create new patient
// @access  Public
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();

    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      patient
    });

  } catch (error) {
    console.error('Create patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating patient'
    });
  }
});

// @route   GET /api/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      patient
    });

  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching patient'
    });
  }
});

// @route   GET /api/patients/:id/consultations
// @desc    Get patient's consultations
// @access  Private
router.get('/:id/consultations', auth, async (req, res) => {
  try {
    const consultations = await Consultation.find({ patient: req.params.id })
      .populate('doctor', 'name specialization rating')
      .sort({ scheduledDate: -1 });

    res.json({
      success: true,
      count: consultations.length,
      consultations
    });

  } catch (error) {
    console.error('Get patient consultations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching consultations'
    });
  }
});

module.exports = router;
