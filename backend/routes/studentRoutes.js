const express = require('express');
const { addStudent, getStudentsByGrade, updatePaymentStatus, checkStudentID, getStudentById, updateStudentDetails, deleteStudent, setAllMonthsPaid } = require('../controllers/studentController');
const router = express.Router();

router.post('/add', addStudent);
router.get('/grade/:grade', getStudentsByGrade);
router.put('/payment-status', updatePaymentStatus);
router.get('/check-id/:studentID', checkStudentID);
router.get('/:studentID', getStudentById);
router.put('/:studentID', updateStudentDetails); // Update student details
router.delete('/:studentID', deleteStudent); // Delete a student
router.put('/:studentID/set-all-paid', setAllMonthsPaid); // Mark all months as paid

module.exports = router;
