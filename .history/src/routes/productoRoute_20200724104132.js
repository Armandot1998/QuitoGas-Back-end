;
'use strict'

const { Router } =  require('express')
const router = Router()
const {getProductos,
       getProductoById,
       createProducto,
       updateProducto} = require('../controllers/producto.controller');

//Rutas
router.get('/productos', getProductos)
router.get('/producto/:id',getProductoById)
router.post('/producto',createProducto)
router.put('/producto/:id',updateProducto)