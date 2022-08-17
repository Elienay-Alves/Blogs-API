const { Router } = require('express');
const BlogPostC = require('../controllers/BlogPost');

const router = Router();

router.get('/:id', BlogPostC.getById);
router.get('/', BlogPostC.getAll);
router.post('/', BlogPostC.create);

module.exports = router;