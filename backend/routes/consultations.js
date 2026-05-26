const express = require('express');
const Consultation = require('../models/Consultation');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/consultations
// @desc    Create new consultation
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { patient, doctor, type, scheduledDate, symptoms } = req.body;

    // Verify doctor exists and is available
    const doctorDoc = await Doctor.findById(doctor);
    if (!doctorDoc || !doctorDoc.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Doctor not found or inactive'
      });
    }

    if (doctorDoc.availability === 'Offline') {
      return res.status(400).json({
        success: false,
        message: 'Doctor is currently offline'
      });
    }

    const consultation = new Consultation({
      patient,
      doctor,
      type,
      scheduledDate: new Date(scheduledDate),
      symptoms
    });

    await consultation.save();

    // Populate the consultation with doctor and patient details
    await consultation.populate([
      { path: 'doctor', select: 'name specialization rating' },
      { path: 'patient', select: 'name email phone age' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Consultation scheduled successfully',
      consultation
    });

  } catch (error) {
    console.error('Create consultation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating consultation'
    });
  }
});

// @route   GET /api/consultations
// @desc    Get all consultations
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (type) {
      filter.type = type;
    }

    const consultations = await Consultation.find(filter)
      .populate('doctor', 'name specialization rating')
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

// @route   GET /api/consultations/:id
// @desc    Get consultation by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('doctor', 'name specialization rating')
      .populate('patient', 'name email phone age medicalHistory allergies');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.json({
      success: true,
      consultation
    });

  } catch (error) {
    console.error('Get consultation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching consultation'
    });
  }
});

// @route   PUT /api/consultations/:id/status
// @desc    Update consultation status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['scheduled', 'in-progress', 'completed', 'cancelled', 'no-show'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('doctor', 'name specialization')
     .populate('patient', 'name email phone');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.json({
      success: true,
      message: 'Consultation status updated successfully',
      consultation
    });

  } catch (error) {
    console.error('Update consultation status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating consultation status'
    });
  }
});

// @route   PUT /api/consultations/:id/diagnosis
// @desc    Add diagnosis and treatment
// @access  Private
router.put('/:id/diagnosis', auth, async (req, res) => {
  try {
    const { diagnosis, treatment, prescription, notes } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { 
        diagnosis, 
        treatment, 
        prescription, 
        notes,
        status: 'completed',
        actualEndTime: new Date()
      },
      { new: true }
    ).populate('doctor', 'name specialization')
     .populate('patient', 'name email phone');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    // Update doctor's consultation count
    await Doctor.findByIdAndUpdate(
      consultation.doctor._id,
      { $inc: { totalConsultations: 1 } }
    );

    res.json({
      success: true,
      message: 'Diagnosis and treatment added successfully',
      consultation
    });

  } catch (error) {
    console.error('Add diagnosis error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding diagnosis'
    });
  }
});

module.exports = router;
