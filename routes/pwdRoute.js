// routes/auth.js
const express = require('express');
const router = express.Router();
const { verifyPassword } = require('../controllers/pwdController');

// Define your password verification endpoint
router.post('/verify-password', verifyPassword);

module.exports = router;
