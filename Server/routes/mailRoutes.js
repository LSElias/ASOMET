const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.post('/sendEventNotification', mailController.sendEventNotification);

module.exports = router;
