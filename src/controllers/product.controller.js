const pool = require('../config/db')
const jwt = require('jsonwebtoken');

const config = require('../config/config');

const getProducts = async(req, res) => {
    const response = await pool.query('select * from producto');
    res.status(200).json(response.rows);
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * from producto where id_producto = $1', [id]);
    res.json(response.rows);
};

const createProduct = async(req, res) => {
    const { nombre, precio } = req.body;
    const response = await pool.query('insert into producto (nombre_producto, precio_producto) values ($1, $2)',
     [ nombre, precio ]);
    res.json({
        menssage: 'Producto Resgistrado'
    })
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { nombre, precio  } = req.body;
    const response = await pool.query('update producto set nombre_producto = $1, precio_producto = $2 where id_producto = $3', 
    [ nombre, precio, id ])
    res.json({
        menssage: 'Producto Actualizado'
    })
};

module.exports = {
    getProducts, createProduct,
    getProductById, updateProduct
}