const { Router } =  require('express');
const router = Router();

const verifyToken = require('../controllers/verifyToken');

// todas las rutas

const { getProducts, createProduct, 
    getProductById, updateProduct } = require('../controllers/product.controller');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);



module.exports = router;