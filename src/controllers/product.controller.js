;
'use strict'

const pool = require('../config/db')

const getProducts = async(req, res) => {
    let productos = req.productos;
    productos = await pool.query("select * from producto where estado_producto = 'Activo'");
    res.status(200).json(productos.rows);
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
        menssage: 'Producto creado exitosamente!'
    });
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body;
    producto = await pool.query('update producto set nombre_producto = $1, precio_producto = $2', 
    [nombre, precio ]);
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
    getProducts, getProductById,
    createProduct, updateProduct,
    deleteProduct
}
