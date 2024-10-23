const express = require('express');
const router = express.Router();
const { logUserActivity } = require('../controller/logController');

// Define your activity logging endpoint
router.post('/log-activity', logUserActivity);

module.exports = router;
