const express = require('express');
const { addStudent, getStudentsByGrade, updatePaymentStatus, checkStudentID, getAllStudentIDs } = require('../controllers/studentController');
const router = express.Router();

router.post('/add', addStudent);
router.get('/grade/:grade', getStudentsByGrade);
router.put('/payment-status', updatePaymentStatus);
router.get('/check-id/:studentID', checkStudentID);
router.get('/all-student-ids', getAllStudentIDs); // New endpoint

module.exports = router;
