const express = require('express');
const { addStudent, getStudentsByGrade, updatePaymentStatus, checkStudentID, getStudentById } = require('../controllers/studentController');
const router = express.Router();

router.post('/add', addStudent); 
router.get('/grade/:grade', getStudentsByGrade); 
router.put('/payment-status', updatePaymentStatus);
router.get('/check-id/:studentID', checkStudentID); 
router.get('/:studentID', getStudentById); 

module.exports = router;
