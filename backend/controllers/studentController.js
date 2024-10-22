const Student = require('../models/Student');

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const { name, grade, studentID, receivedMaterial, notes, householdID } = req.body;
    const newStudent = new Student({ name, grade, studentID, receivedMaterial, notes, householdID });
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Get students by grade
exports.getStudentsByGrade = async (req, res) => {
  try {
    const students = await Student.find({ grade: req.params.grade });
    res.json(students);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { studentID, month, status } = req.body;
    const student = await Student.findOne({ studentID });

    if (student) {
      student.paymentStatus.set(month, status);
      await student.save();
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
