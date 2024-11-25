const express = require('express');
const router = express.Router();
const { attendeeActivity } = require('../controllers/insertID_attController');

router.post('/attendee/activity', attendeeActivity);

module.exports = router;
