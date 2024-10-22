const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
  householdName: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Household', householdSchema);
