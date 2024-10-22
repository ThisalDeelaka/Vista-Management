const express = require('express');
const { createHousehold } = require('../controllers/householdController');
const router = express.Router();

router.post('/create', createHousehold);

module.exports = router;
