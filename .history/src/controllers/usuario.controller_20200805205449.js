;
'use strict'

const pool = require('../config/db')
const jwt = require('jsonwebtoken')

const config = require('../config/config')

const getUsers = async(req, res) => {
    let usuarios = req.usuarios;
    usuarios = await pool.query('select * from usuario');
    res.status(200).json({
        usuarios: usuarios.rows
    });
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const usuario = await pool.query('select * from usuario where id_usuario = $1', [id]);
    res.status(200).json(usuario.rows);
};

const createUser = async(req, res) => {
    const { id_rol, nombre_usuario, apellido_usuario, cedula_usuario, telefono_usuario, direccion_usuario, correo_usuario, password_usuario  } = req.body.usuario;
     
     usuario = await pool.query('insert into usuario ( id_rol, nombre_usuario, apellido_usuario, cedula_usuario, telefono_usuario, direccion_usuario, correo_usuario, password_usuario) values ($1, $2, $3, $4, $5, $6, $7, $8)',
     [ id_rol, nombre_usuario, apellido_usuario, cedula_usuario, telefono_usuario, direccion_usuario, correo_usuario, password_usuario ]);
     res.status(200).json({
        menssage: 'Se ha creado un usuario'
    });
};

const updateUser = async (req, res) => {
    
    const {  id_rol, nombre_usuario, apellido_usuario, cedula_usuario, telefono_usuario, direccion_usuario, correo_usuario, password_usuario,id } = req.body.usuario;
    usuario = await pool.query('update usuario set id_rol = $1, nombre_usuario = $2, apellido_usuario = $3, cedula_usuario = $4, telefono_usuario = $5, direccion_usuario = $6, correo_usuario = $7, password_usuario = $8 where id_usuario = $9', [
        id_rol, nombre_usuario, apellido_usuario, cedula_usuario, telefono_usuario, direccion_usuario, correo_usuario, password_usuario, id
    ]);
    res.status(200).json({
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