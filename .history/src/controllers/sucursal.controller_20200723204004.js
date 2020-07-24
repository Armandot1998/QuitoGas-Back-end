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

module.exports = {
getSucursal
}