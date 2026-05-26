const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Medicine name is required'],
    trim: true,
    unique: true
  },
  genericName: {
    type: String,
    trim: true
  },
  manufacturer: {
    type: String,
    required: [true, 'Manufacturer is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Medicine category is required'],
    enum: [
      'Antibiotic',
      'Pain Relief',
      'Fever Reducer',
      'Cough & Cold',
      'Digestive',
      'Cardiovascular',
      'Diabetes',
      'Hypertension',
      'Other'
    ]
  },
  dosage: {
    type: String,
    required: [true, 'Dosage information is required'],
    trim: true
  },
  form: {
    type: String,
    required: [true, 'Medicine form is required'],
    enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Inhaler']
  },
  strength: {
    type: String,
    required: [true, 'Medicine strength is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  sideEffects: [String],
  contraindications: [String],
  storageInstructions: {
    type: String,
    trim: true
  },
  prescriptionRequired: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  alternatives: [{
    name: String,
    manufacturer: String,
    strength: String
  }]
}, {
  timestamps: true
});

// Index for search functionality
medicineSchema.index({ name: 'text', genericName: 'text', category: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
