// pacakges and module imports
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// `/api/categories` route 
router.use('/categories', categoryRoutes);

// `/api/products` route 
router.use('/products', productRoutes);

// `/api/tags` route 
router.use('/tags', tagRoutes);

module.exports = router;
