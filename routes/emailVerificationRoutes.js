// routes/emailVerificationRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/emailVerificationController');

router.post('/api/verify-email', controller.verifyOTP);

module.exports = router;
