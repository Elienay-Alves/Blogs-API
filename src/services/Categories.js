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

  async getAll() {
    const rows = await Category.findAll({
      raw: true,
      attributes: { exclude: ['password'] },
    });
    
    return rows;
  },
  
  async getById(id) {
    const result = await Category.findByPk(id);
    return result;
  },
  
  async create(body) {
    const newUser = await Category.create(body, { raw: true });
    
    return newUser;
  },

};

module.exports = CategoriesS;