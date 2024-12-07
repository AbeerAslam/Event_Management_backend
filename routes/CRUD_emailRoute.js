const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/CRUD_emailController'); // Adjust the path as necessary

// Route to get all reminder entries
router.get('/reminder', reminderController.getReminderEntries);

// Route to create a new reminder entry
router.post('/reminder', reminderController.createReminderEntry);

// Route to update a reminder entry by ID
router.put('/reminder/:id', reminderController.updateReminderEntry);

// Route to delete a reminder entry by ID
router.delete('/reminder/:id', reminderController.deleteReminderEntry);

module.exports = router; // Ensure you export the router
