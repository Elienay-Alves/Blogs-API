const BlogPostS = require('../services/BlogPost');
const CategoriesS = require('../services/Categories');
const tokenValidation = require('../middlewares/tokenValidation');
const { errorHandler } = require('../services/dinamicError');

const NOT_FOUND = 'Token not found';

const BlogPostC = {  
  async getAll(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', NOT_FOUND);
    
    await tokenValidation.validateToken(token);
    const result = await BlogPostS.getAll();
    res.json(result);
  },

  async getById(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', NOT_FOUND);
    
    await tokenValidation.validateToken(token);

    const id = Number(req.params.id);
    const post = await BlogPostS.getById(id);

    if (!post) errorHandler('NotFoundError', 'Post does not exist');

    res.status(200).json(post);
  },

  async create(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', NOT_FOUND);
    
    const { id } = await tokenValidation.validateToken(token);

    await BlogPostS.validateBody(req.body);

    const checkIfExists = await Promise.all(req.body.categoryIds
      .map((category) => CategoriesS.getById(category)));

    if (checkIfExists.includes(null)) errorHandler('InvalidFieldsError', '"categoryIds" not found');

    const result = await BlogPostS.create(req.body, id);

    await Promise.all(req.body.categoryIds
      .map((categoryId) => BlogPostS.createPostCategory(result.id, categoryId)));

    res.status(201).json(result);
  },

  async search(req, res) {
    const { q } = req.query;
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', NOT_FOUND);
    
    await tokenValidation.validateToken(token);

    const post = await BlogPostS.search(q);

    res.status(200).json(post);
  },

  async update(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', NOT_FOUND);
    
    const { id } = await tokenValidation.validateToken(token);

    await BlogPostS.validateBodyOnUpdate(req.body);

    const post = await BlogPostS.getById(req.params.id);

    if (post.userId !== id) errorHandler('TokenValidationError', 'Unauthorized user');

    await BlogPostS.update(req.body, req.params.id);

    const result = await BlogPostS.getById(req.params.id);

    res.status(200).json(result);
  },

  async delete(req, res) {
    const token = req.headers.authorization;
    
    if (!token) errorHandler('TokenValidationError', NOT_FOUND);
    
    const { id } = await tokenValidation.validateToken(token);
    
    const post = await BlogPostS.getById(req.params.id);

    if (!post) errorHandler('NotFoundError', 'Post does not exist');
    if (post.userId !== id) errorHandler('TokenValidationError', 'Unauthorized user');

    await BlogPostS.delete(req.params.id);

    res.send(204);
  },
};

module.exports = BlogPostC;