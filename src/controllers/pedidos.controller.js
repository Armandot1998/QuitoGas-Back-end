;
'use strict'
const pool = require('../config/db')

/* Consulta para traer los pedidos que tiene una sucursal --> enviar al id_sucursal */

const getPedidos = async(req, res) => {
    const id = req.params.id;
    let pedidos = req.pedidos;
    pedidos = await pool.query('select pedidos.id_pedido, pedidos.cantidad_pedido, pedidos.estado_pedido, pedidos.fecha_pedido, pedidos.fecha_entrega_pedido, pedidos.total from pedidos inner join usuario on pedidos.id_usuario = usuario.id_usuario where pedidos.id_sucursal = $1', [id]);
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
        menssage: 'Se ha creado el pedido'
    });
};

module.exports = {
    getPedidos,
    createPedido
}