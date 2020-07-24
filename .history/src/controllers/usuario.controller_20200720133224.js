;
'use strict'
const pool = require('../config/db')
const jwt = require('jsonwebtoken')

const config = require('../config/config')

const getUsers = async(req, res) => {
    let usuarios = req.usuarios
    usuarios = await pool.query('select * from usuario');
    res.status(200).json({
        usuarios: usuarios.rows
    });
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * from usuario where id_usuario = $1', [id]);
    res.json(response.rows);
};

const createUser = async(req, res) => {
    let usuario = req.body.usuario
     usuario = await pool.query('INSERT INTO usuario SET ?',[req.body.usuario])
     res.status(200).json({
        usuario: usuario.rows,
        menssage: 'Usuario Resgistrado'
    })
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos } = req.body;
    const response = await pool.query('update usuario set nombre_usuario = $1, apellido_usuario = $2 where id_usuario = $3', [
        nombres, apellidos, id
    ])
    res.json({
        menssage: 'Usuario Actualizado',
        auth: true
    })
};

// Obtener los datos del usuario mediante el token generado apartir del login

const infoUser = async (req, res, next) => {
    const id = req.userId;
    const response = await pool.query("select * from usuario where correo_usuario = $1", [id]);
    res.json(response.rows);
}

// Login 

const signinUser = async (req, res, next) => {
    const {usuario, password} = req.body;
    const userEx = await pool.query("select * from usuario where correo_usuario = $1", [usuario]);
    if (userEx.rowCount > 0) {
        const response = await pool.query("select * from usuario where correo_usuario = $1 and password_usuario = $2", [usuario, password]);
        if(response.rowCount > 0) { 
            const token = jwt.sign({id: usuario}, config.secret,{
                expiresIn: 60 * 60 })
            res.json({
                auth: true, 
                menssage: 'usuario logeado',
                token: token
            });
        }else {
            res.json({
                auth: false,
                menssage: 'Credenciales incorrectas'
            });
        }
    }else {
         res.status(404).json({
            menssage: 'El usuario no existe'
        });
    }
};


module.exports = {
    getUsers, createUser,
    getUserById, updateUser,
    infoUser, signinUser
}