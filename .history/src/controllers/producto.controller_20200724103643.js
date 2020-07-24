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

const createProducto = async(req, res) => {
    const {  nombre_producto,precio_producto } = req.body.producto;
     
     producto = await pool.query('insert into producto ( nombre_producto,precio_producto) values ($1, $2)',
     [ nombre_producto,precio_producto]);
     res.status(200).json({
        menssage: 'Se ha creado con éxito'
    });
};

const updateProducto = async (req, res) => {
const id = req.params;
const { nombre_producto,precio_producto  } = req.body.producto;
producto = await pool.query('update producto set  nombre_producto = $1,precio_producto = $2',
 [   nombre_producto,precio_producto, id]);
res.status(200).json({
    menssage: 'Producto Actualizado',
})
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto
}