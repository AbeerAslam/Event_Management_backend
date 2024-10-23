const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

// Define routes for read and delete operations
router.get('/logs', logsController.getLogs);
router.get('/logs/:id', logsController.getLogById);
router.delete('/logs/:id', logsController.deleteLog);

module.exports = router;
