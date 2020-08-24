const { Router } =  require('express');
const router = Router();

const verifyToken = require('../controllers/verifyToken');

// todas las rutas

const { getUsers, createUser, 
    getUserById, updateUser, 
    infoUser, signinUser, updateUsuario} = require('../controllers/usuario.controller');

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/profile',  verifyToken, infoUser );
router.post('/user', createUser);
router.put('/user', updateUser);
router.put('/user/:id', updateUsuario);

router.post('/signin', signinUser);



module.exports = router;