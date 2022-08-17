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

  async getAll() {
    const rows = await User.findAll({
      raw: true,
      attributes: { exclude: ['password'] },
    });

    return rows;
  },

  async getUser(body) {
    const row = await User.findOne({
      where: { email: body.email },
    });

    if (row) errorHandler('ConflictError', 'User already registered');

    return row;
  },

  async getById(id) {
    const row = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['password'] },
    });

    if (!row) errorHandler('NotFoundError', 'User does not exist');

    return row;
  },

  async create(body) {
    const newUser = await User.create(body, { raw: true });
    
    return newUser;
  },

  async delete(id) {
    await User.destroy({ 
      where: {
        id,
      },
    });
  },
};

module.exports = UserS;