const { Router } = require('express');
const UserC = require('../controllers/User');

const router = Router();

router.post('/', UserC.create);

module.exports = router;