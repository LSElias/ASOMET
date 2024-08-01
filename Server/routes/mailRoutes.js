const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.post('/sendEventNotification', mailController.sendEventNotification);
router.post('/sendUserCodePassword', mailController.sendUserCodePassword);

module.exports = router;
