require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { invalidField } = require('./dinamicErrors');

const myPrecious = process.env.JWT_SECRET;

const LoginS = {

  // https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
  async validateBody(body) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).messages({
      'string.empty': 'Some required fields are missing',
      'any.required': 'Some required fields are missing',
    });

    const validation = await schema.validateAsync(body);
    
    return validation;
  },

  generateToken(payload) {
    const token = jwt.sign({ data: payload }, myPrecious);

    return token;
  },

  async validateToken(token) {
    const { data } = jwt.verify(token, myPrecious);

    return data;
  },

  async getUserByEmail(body) {
    const { email, password } = body;
    const row = await User.findOne({
      where: { email },
      raw: true,
    });

    if (!row || row.password !== password) invalidField();
    const { password: _, ...newRow } = row;

    return newRow;
  },
};

module.exports = LoginS;