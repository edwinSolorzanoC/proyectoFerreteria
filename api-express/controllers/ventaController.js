const { poolPromise } = require("../db/config");

const createVenta = async (req, res) => {
    try {
        const { id_cliente, productos, total } = req.body;
        const pool = await poolPromise;
        // Primero: Insertar la factura
        const facturaResult = await pool.request()
            .input("fecha", new Date())
            .input("total", total)
            .input("clientes_id_cliente", id_cliente)
            .query(`
        INSERT INTO facturas (fecha, total, clientes_id_cliente)
        VALUES (@fecha, @total, @clientes_id_cliente);

        SELECT SCOPE_IDENTITY() AS id_factura;
    `);

        // Guardar el id_factura generado
        const idFactura = facturaResult.recordset[0].id_factura;

        // Segundo: Insertar los detalles de la factura
        for (const producto of productos) {
            await pool.request()
                .input("cantidad", producto.cantidad)
                .input("precio_unitario", producto.precio_unitario)
                .input("subtotal", producto.subtotal)
                .input("facturas_id_factura", idFactura)
                .input("productos_id_producto", producto.id_producto)
                .query(`
                INSERT INTO detalles_facturas (cantidad, precio_unitario, subtotal, facturas_id_factura, productos_id_producto)
                VALUES (@cantidad, @precio_unitario, @subtotal, @facturas_id_factura, @productos_id_producto);
            `);
        }

        res.status(201).json({ message: "Venta creada exitosamente", idFactura });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createVenta };
