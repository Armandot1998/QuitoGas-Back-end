const { Router } =  require('express');
const router = Router();

// todas las rutas

const { getAllPedidos, getUserPedidos, 
    getUserPedidosPen, getUserPedidosVen,
    createPedido, updatePedidoEst} = require('../controllers/pedidos.controller');

router.get('/pedidos/:id', getAllPedidos);
router.get('/pedidosUsr/:id', getUserPedidos);
router.get('/pedidosUsrPen/:id', getUserPedidosPen);
router.get('/pedidosUsrVen/:id', getUserPedidosVen);
//router.get('/products/:id', getProductById);
router.post('/pedido', createPedido);
router.put('/pedidoEst/:id', updatePedidoEst);
// router.put('/product/:id', deleteProduct);


module.exports = router;