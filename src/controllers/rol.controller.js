;
'use strict'
const pool = require('../config/db')

const getRoles = async(req, res) => {
    let roles = req.roles
    roles = await pool.query('select * from rol');
    res.status(200).json({
        roles: roles.rows
    });
};

const createRol = async(req, res) => {
    const {  rol,nombre } = req.body.rol;    
     rol = await pool.query('insert into rol ( rol,nombre) values ($1, $2)',
     [rol, nombre]);
     res.status(200).json({
        menssage: 'Se ha creado con éxito'
    });
};

const updateRol = async (req, res) => {
    const { id_rol,rol,nombre } = req.body.rol;
    rol = await pool.query('update rol set  rol = $1,nombre = $2 where id_rol = $3' ,
     [  ro, nombre, id_rol]);
    res.status(200).json({
        menssage: 'Rol Actualizado',
    })
    };

    module.exports = {
        getRoles,
        createRol,
        updateRol
    }