const { Router } =  require('express');
const router = Router();

// todas las rutas

const { getAllPedidosPen, getAllPedidosVen, getUserPedidos, 
    getUserPedidosPen, getUserPedidosVen, getAllPedidosUserPen,
    createPedido, updatePedidoEst} = require('../controllers/pedidos.controller');


router.get('/pedidosUserPen/:id', getAllPedidosUserPen);    
router.get('/pedidosPen/:id', getAllPedidosPen);
router.get('/pedidosVen/:id', getAllPedidosVen);
router.get('/pedidosUsr/:id', getUserPedidos);
router.get('/pedidosUsrPen/:id', getUserPedidosPen);
router.get('/pedidosUsrVen/:id', getUserPedidosVen);
//router.get('/products/:id', getProductById);
router.post('/pedido', createPedido);
router.put('/pedidoEst/:id', updatePedidoEst);
// router.put('/product/:id', deleteProduct);


module.exports = router;