;
'use strict'

const { Router } =  require('express')
const router = Router()
const {getRoles,
       createRol,
       updateRol} = require('../controllers/rol.controller');

//Rutas
router.get('/roles', getRoles)
router.post('/rol',createRol)
router.put('/rol',updateRol)


module.exports = router