const { poolPromise } = require("../db/config");

const getFacturaById = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", id)
            .query(`SELECT * FROM facturas f
                INNER JOIN clientes c ON f.clientes_id_cliente = c.id_cliente
                WHERE id_factura = @id
                `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Factura not found" });
        }

        const productos = await pool.request()
            .input("id", id)
            .query(`
                SELECT         
                    detalles_facturas.*, 
                    p.nombre
                FROM detalles_facturas
                INNER JOIN productos p ON detalles_facturas.productos_id_producto = p.id_producto
                WHERE facturas_id_factura = @id
                `);

        const factura = { ...result.recordset[0], productos: productos.recordset };
        res.status(200).json(factura);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFacturaByClienteId = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", id)
            .query(`SELECT f.* FROM facturas f
                INNER JOIN clientes c ON f.clientes_id_cliente = c.id_cliente
                WHERE clientes_id_cliente = @id
                `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Factura not found" });
        }
        res.status(200).json(result.recordset);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFacturas = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT f.*, c.nombre 
            FROM facturas f 
            INNER JOIN clientes c ON f.clientes_id_cliente = c.id_cliente`);

        const facturas = await Promise.all(result.recordset.map(async (factura) => {
            const detalles = await pool.request()
            .input("id_factura", factura.id_factura)
            .query(`SELECT df.*, p.nombre as nombre_producto
                FROM detalles_facturas df 
                INNER JOIN productos p ON df.productos_id_producto = p.id_producto
                WHERE df.facturas_id_factura = @id_factura`);
            return { ...factura, detalles: detalles.recordset };
        }));

        result.recordset = facturas;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No hay facturas" });
        }
        res.status(200).json(result.recordset);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getFacturaById, getFacturaByClienteId, getFacturas };
