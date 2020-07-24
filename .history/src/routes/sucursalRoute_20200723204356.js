
;
'use strict'

const { Router } =  require('express')
const router = Router()
getRoute = require('../controllers/sucursal.controller');


//Rutas
router.get('/sucursales', getRoute);

