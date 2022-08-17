const jwt = require('jsonwebtoken');
const { errorHandler } = require('../services/dinamicError');
require('dotenv').config();

const myPrecious = process.env.JWT_SECRET;

const tokenValidation = {
  async validateToken(token) {
    try {
      const { data } = jwt.verify(token, myPrecious);
      
      return data;
    } catch (error) {
      errorHandler('TokenValidationError', 'Expired or invalid token');
    }
  },
};

module.exports = tokenValidation;