const express = require('express');
const { addStudent, getStudentsByGrade, updatePaymentStatus, checkStudentID, getStudentById, updateStudentDetails, deleteStudent, setAllMonthsPaid, unsetAllMonthsPaid, promoteAllStudents } = require('../controllers/studentController');
const router = express.Router();
router.put('/promote-all', promoteAllStudents); 
router.post('/add', addStudent);
router.get('/grade/:grade', getStudentsByGrade);
router.put('/payment-status', updatePaymentStatus);
router.get('/check-id/:studentID', checkStudentID);
router.get('/:studentID', getStudentById);
router.put('/:studentID', updateStudentDetails);
router.delete('/:studentID', deleteStudent);
router.put('/:studentID/set-all-paid', setAllMonthsPaid);
router.put('/:studentID/unset-all-paid', unsetAllMonthsPaid);


module.exports = router;
