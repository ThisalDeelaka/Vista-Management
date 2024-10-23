const Student = require('../models/Student');

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const { name, grade, studentID, receivedMaterial, notes, householdID } = req.body;

    // Check if the Student ID already exists
    const existingStudent = await Student.findOne({ studentID });
    if (existingStudent) {
      return res.status(400).json({ msg: 'Student ID already exists.' });
    }

    const newStudent = new Student({ name, grade, studentID, receivedMaterial, notes, householdID });
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Check if Student ID already exists
exports.checkStudentID = async (req, res) => {
  try {
    const { studentID } = req.params;
    const existingStudent = await Student.findOne({ studentID });
    res.json({ exists: !!existingStudent });
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

exports.getAllStudentIDs = async (req, res) => {
  try {
    const students = await Student.find({}, 'studentID'); // Fetch only the studentID field
    const studentIDs = students.map(student => student.studentID);
    res.json({ studentIDs });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { studentID } = req.params;
    const student = await Student.findOne({ studentID });
    if (student) {
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.updateStudentDetails = async (req, res) => {
  try {
    const { studentID } = req.params;
    const { name, grade, studentLetter, studentNumber } = req.body;

    // Generate new Student ID from the letter and number
    const newStudentID = `${studentLetter}${studentNumber}`;

    const student = await Student.findOne({ studentID });

    if (student) {
      // Update details
      student.name = name;
      student.grade = grade;
      student.studentID = newStudentID; // Save the new Student ID

      await student.save();
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const { studentID } = req.params;
    const result = await Student.findOneAndDelete({ studentID });
    if (result) {
      res.json({ msg: 'Student deleted successfully' });
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Mark all months as paid (Free Card feature)
exports.setAllMonthsPaid = async (req, res) => {
  try {
    const { studentID } = req.params;
    const student = await Student.findOne({ studentID });

    if (student) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      months.forEach(month => {
        student.paymentStatus.set(month, true);
      });
      await student.save();
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Unset free card: mark all months from the current month onward as unpaid
exports.unsetAllMonthsPaid = async (req, res) => {
  try {
    const { studentID } = req.params;
    const student = await Student.findOne({ studentID });

    if (student) {
      // Get the current month index to determine where to start unsetting payments
      const currentMonthIndex = new Date().getMonth();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Update the `paymentStatus` map, setting current and future months to "Not Paid"
      months.forEach((month, index) => {
        if (index >= currentMonthIndex) {
          student.paymentStatus.set(month, 'Not Paid');
        }
      });

      // Save the updated student data to MongoDB
      await student.save();
      res.json({ success: true, student });
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.error('Error unsetting all months paid:', error);
    res.status(500).send('Server Error');
  }
};


exports.promoteAllStudents = async (req, res) => {
  try {
    // Fetch all students
    const students = await Student.find();

    // Check if students exist
    if (!students || students.length === 0) {
      console.log("No students found");
      return res.status(404).send('No students found');
    }

    // Iterate over each student to promote or remove
    for (let student of students) {
      console.log(`Processing student: ${student.studentID} - Grade: ${student.grade}`);

      if (student.grade === 11) {
        // Remove students in Grade 11 from the system
        console.log(`Removing student: ${student.studentID}`);
        await Student.deleteOne({ _id: student._id });
      } else {
        // Promote students in other grades by increasing their grade
        console.log(`Promoting student: ${student.studentID}`);
        student.grade += 1;
        student.paymentStatus = {}; // Reset payment statuses
        await student.save();
      }
    }

    res.json({ message: 'Students promoted successfully. Grade 11 students have been removed.' });
  } catch (error) {
    console.error('Error promoting students:', error);
    res.status(500).send('Server Error');
  }
};
