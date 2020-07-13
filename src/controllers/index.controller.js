const pool = require('../config/db')

const getUsers = async(req, res) => {
    const response = await pool.query('select * from usuario');
    res.status(200).json(response.rows);
}

const createUser = async(req, res) => {
    const { rol, nombres, apellidos, cedula, telefono, direccion, correo, clave  } = req.body;
    const response = await pool.query('insert into usuario ( id_rol, nombre_usuario, apellido_usuario, cedula_usuario, telefono_usuario, direccion_usuario, correo_usuario, password_usuario) values ($1, $2, $3, $4, $5, $6, $7, $8)',
     [ rol, nombres, apellidos, cedula, telefono, direccion, correo, clave ])
    console.log(response);
    res.send('user created');
}

module.exports = {
    getUsers, createUser
}