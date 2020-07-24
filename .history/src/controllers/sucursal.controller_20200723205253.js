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

module.exports = {
getSucursal
}