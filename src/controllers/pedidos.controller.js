;
'use strict'
const pool = require('../config/db')

/* Consulta que devuelve el historial de pedidos pendientes realizados por el usuario */

const getAllPedidosUserPen= async(req, res) => {
    const id = req.params.id;
    let pedidos = req.pedidos;
    pedidos = await pool.query("select * from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario inner join producto on pedidos.id_producto = producto.id_producto where id_sucursal = $1 and pedidos.estado_pedido = 'Pendiente'", [id]);
    res.status(200).json({
        productos: pedidos.rows
    });
};

/* Consulta que devuelve el historial de pedidos vendidos realizados por el usuario */

const getAllPedidosUserVen= async(req, res) => {
    const id = req.params.id;
    let pedidos = req.pedidos;
    pedidos = await pool.query("select * from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario inner join producto on pedidos.id_producto = producto.id_producto where id_sucursal = $1 and pedidos.estado_pedido = 'Vendido'", [id]);
    res.status(200).json({
        productos: pedidos.rows
    });
};

/* Consulta para traer los pedidos que tiene una sucursal --> enviar al id_sucursal */

const getAllPedidosPen = async(req, res) => {
    const id = req.params.id;
    let pedidos = req.pedidos;
    pedidos = await pool.query("select * from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario inner join producto on pedidos.id_producto = producto.id_producto where id_sucursal = $1 and pedidos.estado_pedido = 'Pendiente'", [id]);
    res.status(200).json({
        productos: pedidos.rows
    });
};

/* Consulta para traer los pedidos pendientes que tiene una sucursal --> enviar al id_sucursal */

const getAllPedidosVen = async(req, res) => {
    const id = req.params.id;
    let pedidos = req.pedidos;
    pedidos = await pool.query("select pedidos.id_pedido, pedidos.cantidad_pedido, pedidos.estado_pedido, pedidos.fecha_pedido, pedidos.fecha_entrega_pedido, pedidos.total from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario where pedidos.id_sucursal = $1 and estado_pedido = 'Vendido'", [id]);
    res.status(200).json({
        productos: pedidos.rows
    });
};

/* Consulta para traer todos los pedidos que se han realizado a una sucursal dependeindo de: el id_sucursal y el id_usuario */
const getUserPedidos = async(req, res) => {
    const id = req.params.id;
    const { id_usuario } = req.body;
    let pedidos = req.pedidos;
    pedidos = await pool.query('select pedidos.id_pedido, pedidos.cantidad_pedido, pedidos.estado_pedido, pedidos.fecha_pedido, pedidos.fecha_entrega_pedido, pedidos.total from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario where pedidos.id_sucursal = $1 and usuario.id_usuario = $2',
     [id, id_usuario]);
    res.status(200).json({
        productos: pedidos.rows
    });
};

/* Consulta para traer todos los pedidos pendientes que se han realizado a una sucursal dependeindo de: el id_sucursal y el id_usuario */
const getUserPedidosPen = async(req, res) => {
    const id = req.params.id;
    const { id_usuario } = req.body;
    let pedidos = req.pedidos;
    pedidos = await pool.query("select pedidos.id_pedido, pedidos.cantidad_pedido, pedidos.estado_pedido, pedidos.fecha_pedido, pedidos.fecha_entrega_pedido, pedidos.total from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario where pedidos.id_sucursal = $1 and usuario.id_usuario = $2 and estado_pedido ='Pendiente'",
     [id, id_usuario]);
    res.status(200).json({
        productos: pedidos.rows
    });
};

/* Consulta para traer todos los pedidos vendidos que se han realizado a una sucursal dependeindo de: el id_sucursal y el id_usuario */
const getUserPedidosVen = async(req, res) => {
    const id = req.params.id;
    const { id_usuario } = req.body;
    let pedidos = req.pedidos;
    pedidos = await pool.query("select pedidos.id_pedido, pedidos.cantidad_pedido, pedidos.estado_pedido, pedidos.fecha_pedido, pedidos.fecha_entrega_pedido, pedidos.total from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario where pedidos.id_sucursal = $1 and usuario.id_usuario = $2 and estado_pedido ='Vendido'",
     [id, id_usuario]);
    res.status(200).json({
        productos: pedidos.rows
    });
};


/* Crea el pedido mas el calculo del total = precio_producto * cantidad_pedido */

const createPedido = async(req, res) => {

    const { id_producto, id_usuario, id_sucursal, cantidad_pedido, fecha_pedido, fecha_entrega_pedido} = req.body;

     usuario = await pool.query("insert into pedidos (id_producto, id_usuario, id_sucursal, cantidad_pedido, estado_pedido, fecha_pedido, fecha_entrega_pedido) values ($1, $2, $3, $4, 'Pendiente', $5, $6)",
     [ id_producto, id_usuario, id_sucursal, cantidad_pedido, fecha_pedido, fecha_entrega_pedido]);
     res.status(200).json({
        success: true,
        menssage: 'Se ha creado el pedido'
    });
};

/* Actualiza el estado del pedido de Pendiente --> Vendido dependiendo del id_pedido */
const updatePedidoEst = async (req, res) => {
    const id = req.params.id;
    producto = await pool.query("update pedidos set estado_pedido = 'Vendido' where id_pedido = $1", 
    [id]);
    res.status(200).json({
        menssage: 'Producto actualizado exitosamente!'
    })
};

module.exports = {
    getAllPedidosUserVen,
    getAllPedidosUserPen,
    getAllPedidosPen,
    getAllPedidosVen,
    getUserPedidos,
    getUserPedidosPen,
    getUserPedidosVen,
    createPedido,
    updatePedidoEst
}