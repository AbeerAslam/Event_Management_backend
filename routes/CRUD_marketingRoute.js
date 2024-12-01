const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/CRUD_marketingController'); // Adjust the path as necessary

// Route to get all marketing entries
router.get('/marketing', marketingController.getMarketingEntries);

// Route to create a new marketing entry
router.post('/marketing', marketingController.createMarketingEntry);

// Route to update a marketing entry by ID
router.put('/marketing/:id', marketingController.updateMarketingEntry);

// Route to delete a marketing entry by ID
router.delete('/marketing/:id', marketingController.deleteMarketingEntry);

module.exports = router; // Ensure you export the router
