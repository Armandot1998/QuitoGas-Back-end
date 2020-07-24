
;
'use strict'

const { Router } =  require('express')
const router = Router()
 const {getSucursal,
        getSucursalById,
        createSucursal,
        updateSucursal} = require('../controllers/sucursal.controller');


//Rutas
router.get('/sucursales', getSucursal)
router.get('/sucursal/:id', getSucursalById)
router.post('/sucursal', createSucursal)
router.updateSucursal('/sucursal/:id',updateSucursal)


module.exports = router

