const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/showEvents_attController');

router.get('/events/:category', categoriesController.getEventsByCategory);
router.get('/events/registered/:email', categoriesController.getRegisteredEvents);

module.exports = router;
