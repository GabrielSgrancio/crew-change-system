const express = require('express');
const router = express.Router();
const shipController = require('../controllers/shipController');
const auth = require('../middlewares/auth');

// Protege todas as rotas com o middleware de autenticação
router.use(auth);

router.post('/', shipController.createShip);
router.get('/', shipController.getShips);
router.get('/:id', shipController.getShipById);
router.put('/:id', shipController.updateShip);
router.delete('/:id', shipController.deleteShip);

module.exports = router;
