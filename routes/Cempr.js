const express = require('express');
const router = express.Router();
const cempController = require('../controllers/Cemp');

router.post('/emp', cempController.createEmp);
module.exports = router;
