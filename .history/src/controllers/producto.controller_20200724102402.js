;
'use strict'
const pool = require('../config/db')

const getProductos = async(req, res) => {
    let productos = req.productos
    productos = await pool.query('select * from producto');
    res.status(200).json({
        productos: productos.rows
    });
};

module.exports = {
    getProductos
}