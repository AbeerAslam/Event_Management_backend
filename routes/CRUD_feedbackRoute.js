const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/CRUD_feedbackController'); // Adjust the path as necessary

// Route to get all feedback entries
router.get('/feedback', feedbackController.getFeedbackEntries);


// Route to create a new feedback entry
router.post('/feedback', feedbackController.createFeedbackEntry);

// Route to update a feedback entry by ID
router.put('/feedback/:id', feedbackController.updateFeedbackEntry);

// Route to delete a feedback entry by ID
router.delete('/feedback/:id', feedbackController.deleteFeedbackEntry);

module.exports = router; // Ensure you export the router
