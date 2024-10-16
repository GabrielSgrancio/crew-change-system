const express = require('express');
const router = express.Router();
const crewController = require('../controllers/crewController');
const auth = require('../middlewares/auth');

//router.use(auth);

router.post('/', crewController.createCrewMember);
router.get('/', crewController.getCrewMembers);
router.get('/:id', crewController.getCrewMemberById);
router.put('/:id', crewController.updateCrewMember);
router.delete('/:id', crewController.deleteCrewMember);

module.exports = router;
