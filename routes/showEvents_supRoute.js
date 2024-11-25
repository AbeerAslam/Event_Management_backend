const express = require('express');
const router = express.Router();
const { allEvents } = require('../controllers/showEvents_supController');

router.get('/s_events/all', allEvents); // Specific route for all events

module.exports = router;
