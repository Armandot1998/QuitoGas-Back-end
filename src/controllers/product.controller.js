;
'use strict'

const pool = require('../config/db')

const getProducts = async(req, res) => {
    let productos = req.productos;
    productos = await pool.query("select * from producto where estado_producto = 'Activo'");
    res.status(200).json(productos.rows);
};

const getPoints = async(req, res) => {
    let points = req.productos;
    points = await pool.query("select * from point");
    res.status(200).json({
        points: points.rows });
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const producto = await pool.query("select * from producto where id_producto = $1 and estado_producto = 'Activo'",
     [id]);
    res.status(200).json(producto.rows);
};

const createProduct = async(req, res) => {
    const { nombre, precio } = req.body;
    const estado = 'Activo';   
     producto = await pool.query('insert into producto ( nombre_producto, precio_producto, estado_producto) values ($1, $2, $3)',
     [ nombre, precio, estado ]);
     res.status(200).json({
        success: true,
        menssage: 'Producto creado exitosamente!'
    });
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body;
    producto = await pool.query('update producto set nombre_producto = $1, precio_producto = $2 where id_producto = $3', 
    [nombre, precio, id ]);
    res.status(200).json({
        menssage: 'Producto actualizado exitosamente!'
    })
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const estado = 'Inactivo';
    producto = await pool.query('update producto set estado_producto = $1 where id_producto = $2' , 
    [estado, id ]);
    res.status(200).json({
        menssage: 'Producto removido exitosamente!'
    })
};


module.exports = {
    getPoints,
    getProducts, getProductById,
    createProduct, updateProduct,
    deleteProduct
}
