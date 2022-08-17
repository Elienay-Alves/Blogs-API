const Joi = require('joi');
const models = require('../database/models');

const BlogPostS = {
  async validateBody(body) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number()).required(),
    }).messages({
      'string.empty': 'Some required fields are missing',
      'any.required': 'Some required fields are missing',
    });

    const validation = await schema.validateAsync(body);

    return validation;
  },

  async getAll() {
    const posts = await models.BlogPost.findAll({
      attributes: { exclude: ['UserId'] },
      include: [{
        model: models.User, 
        as: 'User',
        attributes: { exclude: ['password'] },
      },
    {
      model: models.Category,
      as: 'categories',
      through: { attributes: { exclude: ['postId', 'categoryId'] } },
    }],
    });
    return posts;
},
  async create({ title, content }, id) {
    const published = new Date();
    const updated = new Date();
    const post = await models.BlogPost.create(
      { title, content, userId: id, published, updated }, { raw: true },
      );
    
    return post;
  },

  async createPostCategory(postId, categoryId) {
    const postCategory = await models.PostCategory.create({ postId, categoryId });

    return postCategory;
  },
};

module.exports = BlogPostS;