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

const getProductoById = async (req, res) => {
    const id = req.params;
    const producto = await pool.query('select * from sucursal where id_sucursal = $1', [id]);
    res.status(200).json({
        menssage : 'ok'});
};

module.exports = {
    getProductos
}