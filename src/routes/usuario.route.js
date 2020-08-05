const { Router } =  require('express');
const router = Router();

const verifyToken = require('../controllers/verifyToken');

// todas las rutas

const { getUsers, createUser, 
    getUserById, updateUser, 
    infoUser, signinUser} = require('../controllers/usuario.controller');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/profile',  verifyToken, infoUser );
// router.get('/out',  verifyToken, outUser );
router.post('/users', createUser);
router.put('/user', updateUser);

router.post('/signin', signinUser);



module.exports = router;