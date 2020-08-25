;
'use strict'
const pool = require('../config/db')

const getSucursalByUserId = async (req, res) => {
    const id = req.params.id;
    const sucursal = await pool.query('select * from sucursal where id_usuario = $1', [id]);
    res.status(200).json(sucursal.rows);
};

const getSucursal = async(req, res) => {
    let sucursales = req.sucursales
    sucursales = await pool.query(`select usuario.id_usuario, usuario.nombre_usuario,
    usuario.apellido_usuario,producto.nombre_producto,producto.id_producto,producto.precio_producto, usuario.cedula_usuario, usuario.telefono_usuario,
    usuario.direccion_usuario, usuario.correo_usuario, sucursal.id_sucursal,
    sucursal.nombre_sucursal, sucursal.direccion_sucursal, sucursal.telefono_sucursal,
    sucursal.correo_sucursal, sucursal.stock_sucursal, sucursal.lat, sucursal.long  
    from sucursal inner join usuario on usuario.id_usuario = sucursal.id_usuario
    inner join producto on sucursal.id_producto = producto.id_producto`);
    res.status(200).json({
        sucursales: sucursales.rows
    });
};

const getListaUsuariosSucursal = async(req, res) => {
    let sucursales = req.sucursales
    sucursales = await pool.query('select nombre_usuario,apellido_usuario, id_usuario from usuario where id_rol = 2');
    res.status(200).json({
        UsuariosSucursales: sucursales.rows
    });
};

const getSucursalById = async (req, res) => {
    const id = req.params.id;
    const sucursal = await pool.query(`	select usuario.id_usuario, usuario.nombre_usuario, usuario.apellido_usuario,producto.nombre_producto,producto.id_producto,
	producto.precio_producto,usuario.cedula_usuario, usuario.telefono_usuario, usuario.direccion_usuario,
	usuario.correo_usuario, sucursal.id_sucursal, sucursal.nombre_sucursal, sucursal.direccion_sucursal,
	sucursal.telefono_sucursal, sucursal.correo_sucursal, sucursal.stock_sucursal, sucursal.lat, sucursal.long from sucursal
	inner join usuario on usuario.id_usuario = sucursal.id_usuario 
	inner join producto on sucursal.id_producto = producto.id_producto where sucursal.id_sucursal =$1`, [id]);
    if(sucursal.rowCount > 0){
        return res.json({ Sucursal : sucursal.rows[0]});
    }
    res.status(404).json({text: "La Sucursal no existe"});
};

const createSucursal = async(req, res) => {
    const {  id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal, lat, long  } = req.body.sucursal;
     
     sucursal = await pool.query('insert into sucursal ( id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal, lat, long) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
     [ id_usuario, id_producto, nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal, stock_sucursal, lat, long]);
     res.status(200).json({
        menssage: 'Se ha creado una sucursal'
    });
};

const updateSucursal = async (req, res) => {
    const id = req.params.id;
    const { id_usuario, id_producto,nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal,stock_sucursal,lat, long } = req.body;
    sucursal = await pool.query('update sucursal set id_usuario = $1,id_producto =$2,nombre_sucursal = $3, telefono_sucursal = $4, direccion_sucursal = $5, correo_sucursal = $6, stock_sucursal =$7,lat = $8,long = $9 where id_sucursal = $10', [
        id_usuario,id_producto,nombre_sucursal, telefono_sucursal, direccion_sucursal, correo_sucursal,stock_sucursal,lat, long,id
    ]);
    res.status(200).json({
        menssage: 'Sucursal Actualizada',
        auth: true
    })
};

module.exports = {
getSucursalByUserId,
getSucursal,
getSucursalById,
createSucursal,
updateSucursal,
getListaUsuariosSucursal
}