const express = require('express');
const router = express.Router();
const portController = require('../controllers/portController');

router.post('/', portController.createPort);
router.get('/', portController.getPorts);
router.get('/:id', portController.getPortById);
router.post('/:id', portController.updatePort);
router.get('/:id', portController.deletePort);

module.exports = router;

