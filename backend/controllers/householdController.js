const Household = require('../models/Household');
const Student = require('../models/Student');

// Create or link a household
exports.createHousehold = async (req, res) => {
  try {
    const { householdName, studentIDs } = req.body;
    const household = new Household({ householdName, students: studentIDs });
    await household.save();

    // Link students to the household
    await Student.updateMany({ _id: { $in: studentIDs } }, { householdID: household._id });

    res.json(household);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
