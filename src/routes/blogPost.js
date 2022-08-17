const { Router } = require('express');
const BlogPostC = require('../controllers/BlogPost');

const router = Router();

router.post('/', BlogPostC.create);
router.get('/:id', BlogPostC.getById);
router.get('/', BlogPostC.getAll);
router.put('/:id', BlogPostC.update);
router.delete('/:id', BlogPostC.delete);

module.exports = router;