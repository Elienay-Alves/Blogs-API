const Joi = require('joi');
const { Category } = require('../database/models');

const CategoriesS = {
  async validateBody(body) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const validation = await schema.validateAsync(body);

    return validation;
  },

  async create(body) {
    const newUser = await Category.create(body, { raw: true });
    
    return newUser;
  },
};

module.exports = CategoriesS;