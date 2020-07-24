
;
'use strict'

const { Router } =  require('express')
const router = Router()
 const {getSucursal} = require('../controllers/sucursal.controller');


//Rutas
router.get('/sucursales', getSucursal);


module.exports = router

