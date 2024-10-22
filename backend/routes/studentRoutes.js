const express = require('express');
const { addStudent, getStudentsByGrade, updatePaymentStatus } = require('../controllers/studentController');
const router = express.Router();

router.post('/add', addStudent);
router.get('/grade/:grade', getStudentsByGrade);
router.put('/payment-status', updatePaymentStatus);

module.exports = router;
