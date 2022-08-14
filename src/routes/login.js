const { Router } = require('express');
const LoginC = require('../controllers/Login');

const loginRoute = Router();

loginRoute.post('/', LoginC.post);

module.exports = loginRoute; 