const express = require('express');
const router = express.Router();
const supportRequestController = require('../../controllers/common/supportRequest-controller.js');

router.post('/support', supportRequestController.createSupportRequest);
router.get('/support', supportRequestController.getSupportRequests);
router.delete('/support/:id', supportRequestController.deleteSupportRequest);

module.exports = router;