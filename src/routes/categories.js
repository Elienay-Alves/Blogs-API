const { Router } = require('express');
const CategoriesC = require('../controllers/Categories');

const router = Router();

router.get('/', CategoriesC.getAll);
router.post('/', CategoriesC.create);

module.exports = router;