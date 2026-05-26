const express = require('express');
const Medicine = require('../models/Medicine');

const router = express.Router();

// @route   GET /api/medicines
// @desc    Get all medicines with search and filter
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, category, form, page = 1, limit = 20 } = req.query;
    
    let filter = { isActive: true };
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (form) {
      filter.form = form;
    }

    const medicines = await Medicine.find(filter)
      .sort(search ? { score: { $meta: 'textScore' } } : { name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Medicine.countDocuments(filter);

    res.json({
      success: true,
      count: medicines.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      medicines
    });

  } catch (error) {
    console.error('Get medicines error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching medicines'
    });
  }
});

// @route   GET /api/medicines/:id
// @desc    Get medicine by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    
    if (!medicine || !medicine.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }

    res.json({
      success: true,
      medicine
    });

  } catch (error) {
    console.error('Get medicine error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching medicine'
    });
  }
});

// @route   GET /api/medicines/search/:query
// @desc    Search medicines by name
// @access  Public
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    
    const medicines = await Medicine.find({
      $text: { $search: query },
      isActive: true
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(10);

    res.json({
      success: true,
      count: medicines.length,
      medicines
    });

  } catch (error) {
    console.error('Search medicines error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error searching medicines'
    });
  }
});

module.exports = router;
