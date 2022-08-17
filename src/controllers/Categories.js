const CategoriesS = require('../services/Categories');
const tokenValidation = require('../middlewares/tokenValidation');
const { errorHandler } = require('../services/dinamicError');

const UserC = {
  async getAll(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', 'Token not found');
    
    await tokenValidation.validateToken(token);

    const rows = await CategoriesS.getAll();

    res.status(200).json(rows);
  },
  
  async create(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', 'Token not found');
    
    await tokenValidation.validateToken(token);
    await CategoriesS.validateBody(req.body);
    const result = await CategoriesS.create(req.body);

    res.status(201).json(result);
  },
};

module.exports = UserC;