const { Router } = require('express');
const CategoriesC = require('../controllers/Categories');

const router = Router();

router.post('/', CategoriesC.create);

module.exports = router;