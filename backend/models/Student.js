const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: Number, required: true },
  studentID: { type: String, required: true, unique: true },
  paymentStatus: { type: Map, of: String, default: {} },
  receivedMaterial: { type: Boolean, default: false },
  notes: { type: String },
  householdID: { type: mongoose.Schema.Types.ObjectId, ref: 'Household' },
});

module.exports = mongoose.model('Student', studentSchema);
