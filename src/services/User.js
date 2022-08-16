const Joi = require('joi');
const { User } = require('../database/models');
const { errorHandler } = require('./dinamicError');

const UserS = {
  async validateBody(body) {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string(),
    });

    const validation = await schema.validateAsync(body);

    return validation;
  },

  async getUser(body) {
    const row = await User.findOne({
      where: { email: body.email },
    });

    if (row) errorHandler('ConflictError', 'User already registered');

    return row;
  },

  async create(body) {
    const newUser = await User.create(body, { raw: true });
    
    return newUser;
  },
};

module.exports = UserS;