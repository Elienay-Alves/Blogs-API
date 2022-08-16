const { Router } = require('express');
const LoginC = require('../controllers/Login');

const router = Router();

router.post('/', LoginC.login);

module.exports = router; 