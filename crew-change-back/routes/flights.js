
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const auth = require('../middlewares/auth');

//router.use(auth);

router.post('/', flightController.createFlight);
router.get('/', flightController.getFlights);
router.get('/:id', flightController.getFlightById);
router.put('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);

module.exports = router;
