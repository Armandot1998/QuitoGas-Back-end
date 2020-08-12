const { Router } =  require('express');
const router = Router();

// todas las rutas

const { getPedidos, createPedido} = require('../controllers/pedidos.controller');

router.get('/pedidos/:id', getPedidos);
//router.get('/products/:id', getProductById);
router.post('/pedido', createPedido);
// router.put('/products/:id', updateProduct);
// router.put('/product/:id', deleteProduct);


module.exports = router;