
;
'use strict'

const { Router } =  require('express')
const router = Router()
 const {getSucursal,
        getSucursalById,
        createSucursal, getSucursalByUserId,
        updateSucursal,getListaUsuariosSucursal} = require('../controllers/sucursal.controller');


//Rutas
router.get('/infoSucursal/:id', getSucursalByUserId)
router.get('/sucursales', getSucursal)
router.get('/sucursal/:id', getSucursalById)
router.post('/sucursal', createSucursal)
router.put('/sucursal/:id', updateSucursal)
router.get('/UsuSucursales', getListaUsuariosSucursal)


module.exports = router

