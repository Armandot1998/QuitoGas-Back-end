/* Agregar la columna total precio x cantidad  */
alter table pedidos add column total decimal 

/* Agregar la columna id_sucursal */
alter table pedidos add column id_sucursal int

/* Agregar la referencia foireing key de la tabla sucursal */
ALTER TABLE pedidos 
ADD CONSTRAINT fk_sucursal 
FOREIGN KEY (id_sucursal) 
REFERENCES sucursal (id_sucursal);

/* Triggger que calcula el total de los pedidos */
CREATE OR REPLACE FUNCTION total_pedido() RETURNS TRIGGER AS $total_pedido$
   BEGIN
      update pedidos set total = (select ((select precio_producto from producto where id_producto 
= (select id_producto from pedidos where id_pedido = (select id_pedido from pedidos order by id_pedido desc limit 1)))
*(select cantidad_pedido from pedidos where id_pedido = (select id_pedido from pedidos order by id_pedido desc limit 1))))
where id_pedido = (select id_pedido from pedidos order by id_pedido desc limit 1);
      RETURN NEW;
   END;
$total_pedido$ LANGUAGE plpgsql;

CREATE TRIGGER total_trigger AFTER INSERT ON pedidos
FOR EACH ROW EXECUTE PROCEDURE total_pedido();

/* Trigger que disminuye el stok de la sucursal */
CREATE OR REPLACE FUNCTION stock_pedido() RETURNS TRIGGER AS $stock_pedido$
   BEGIN
      update sucursal set stock_sucursal = (select ((select stock_sucursal from sucursal where id_sucursal = (select id_sucursal from sucursal order by id_sucursal desc limit 1))
	  -(select cantidad_pedido from pedidos where id_pedido = (select id_pedido from pedidos order by id_pedido desc limit 1))))
	  where id_sucursal = (select id_sucursal from pedidos order by id_pedido desc limit 1);
      RETURN NEW;
   END;
$stock_pedido$ LANGUAGE plpgsql;

CREATE TRIGGER stock_trigger AFTER INSERT ON pedidos
FOR EACH ROW EXECUTE PROCEDURE stock_pedido();