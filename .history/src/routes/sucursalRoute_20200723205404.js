
;
'use strict'

const { Router } =  require('express')
const router = Router()
 const {getSucursal,getSucursalById} = require('../controllers/sucursal.controller');


//Rutas
router.get('/sucursales', getSucursal);
router.get('/sucursal/:id', getSucursalById);


module.exports = router

