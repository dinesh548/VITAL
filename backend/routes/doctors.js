const express = require('express');
const Doctor = require('../models/Doctor');
const Consultation = require('../models/Consultation');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/doctors
// @desc    Get all doctors (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { specialization, language, availability } = req.query;
    
    let filter = { isActive: true };
    
    if (specialization) {
      filter.specialization = new RegExp(specialization, 'i');
    }
    
    if (language) {
      filter.languages = language;
    }
    
    if (availability) {
      filter.availability = availability;
    }

    const doctors = await Doctor.find(filter)
      .select('-password')
      .sort({ rating: -1, totalConsultations: -1 });

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching doctors'
    });
  }
});

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    
    if (!doctor || !doctor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      doctor
    });

  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching doctor'
    });
  }
});

// @route   GET /api/doctors/:id/consultations
// @desc    Get doctor's consultations
// @access  Private
router.get('/:id/consultations', auth, async (req, res) => {
  try {
    // Check if the doctor is accessing their own consultations
    if (req.doctor._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { status, type, page = 1, limit = 10 } = req.query;
    
    let filter = { doctor: req.params.id };
    
    if (status) {
      filter.status = status;
    }
    
    if (type) {
      filter.type = type;
    }

    const consultations = await Consultation.find(filter)
      .populate('patient', 'name email phone age')
      .sort({ scheduledDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Consultation.countDocuments(filter);

    res.json({
      success: true,
      count: consultations.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      consultations
    });

  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching consultations'
    });
  }
});

// @route   PUT /api/doctors/availability
// @desc    Update doctor availability
// @access  Private
router.put('/availability', auth, async (req, res) => {
  try {
    const { availability } = req.body;
    
    if (!['Available', 'Busy', 'Offline'].includes(availability)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid availability status'
      });
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.doctor._id,
      { availability },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Availability updated successfully',
      doctor
    });

  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating availability'
    });
  }
});

module.exports = router;
