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

const postFactura = async (req, res) => {

}

module.exports = { getFacturaById, postFactura };
