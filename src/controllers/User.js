const UserS = require('../services/User');
const LoginS = require('../services/Login');
const tokenValidation = require('../middlewares/tokenValidation');
const { errorHandler } = require('../services/dinamicError');

const UserC = {
  async getAll(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', 'Token not found');
    
    await tokenValidation.validateToken(token);

    const rows = await UserS.getAll();

    res.status(200).json(rows);
  },

  async getById(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', 'Token not found');
    
    await tokenValidation.validateToken(token);

    const id = Number(req.params.id);
    const row = await UserS.getById(id);

    res.status(200).json(row);
  },

  async create(req, res) {
    await UserS.validateBody(req.body);
    await UserS.getUser(req.body);

    const newUser = UserS.create(req.body);
    const token = await LoginS.generateToken(newUser);

    res.status(201).json({ token });
  },
};

module.exports = UserC;