const { Router } = require('express');
const UserC = require('../controllers/User');

const router = Router();

router.get('/', UserC.getAll);
router.get('/:id', UserC.getById);
router.post('/', UserC.create);
router.delete('/me', UserC.delete);

module.exports = router;