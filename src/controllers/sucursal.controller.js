;
'use strict'
const pool = require('../config/db')

const getSucursal = async(req, res) => {
    let sucursales = req.sucursales
    sucursales = await pool.query('select * from sucursal');
    res.status(200).json({
        sucursales: sucursales.rows
    });
};

const getSucursalById = async (req, res) => {
    const id = req.params;
    const sucursal = await pool.query('select * from sucursal where id_sucursal = $1', [id]);
    res.status(200).json({
        menssage : 'ok'});
};

const createSucursal = async(req, res) => {
    const {  id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal  } = req.body.sucursal;
     
     sucursal = await pool.query('insert into sucursal ( id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal) values ($1, $2, $3, $4, $5, $6, $7)',
     [ id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal]);
     res.status(200).json({
        menssage: 'Se ha creado una sucursal'
    });
};

const updateSucursal = async (req, res) => {
    const id = req.params;
    const { id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal  } = req.body.sucursal;
    sucursal = await pool.query('update sucursal set id_usuario= $1, id_producto = $2, nombre_sucursal = $3, telefono_sucursal = $4, direccion_sucursal = $5, correo_sucursal = $6, stock_sucursal = $7', [
        id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal, id
    ]);
    res.status(200).json({
        menssage: 'Sucursal Actualizada',
        auth: true
    })
};

module.exports = {
getSucursal,
getSucursalById,
createSucursal,
updateSucursal
}