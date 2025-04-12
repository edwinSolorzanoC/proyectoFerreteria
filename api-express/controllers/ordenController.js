const { poolPromise } = require('../db/config');

const getAllOrdens = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT * FROM ordenesDeCompra`);
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postOrden = async (req, res) => {
    try {        
        if (await getOrdenByIdProducto(req)) {
            return res.status(400).json({ error: "Ya existe una orden de compra ACTIVA para este producto" });
        }

        // crear la orden de compra
        const orden = await createOrden(req);
        res.status(201).json({ message: orden.message });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", id)
            .query(`UPDATE ordenesDeCompra SET estado = 0 WHERE id_orden = @id`);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        res.status(200).json({ message: "Orden eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getOrdenByIdProducto = async (req) => {
    try {
        const { productos_id_producto } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", productos_id_producto)
            .query(`SELECT * FROM ordenesDeCompra WHERE productos_id_producto = @id AND estado = 1`);
        return result.recordset.length !== 0; // Si no existe la orden de compra, se puede crear una nueva
    } catch (error) {
        throw new Error(error.message);
    }
}


const createOrden = async (req) => {
    try {        
        const pool = await poolPromise;
        const { cantidad, proveedores_id_proveedor, productos_id_producto } = req.body;
        await pool.request()
            .input("fecha", new Date())
            .input("cantidad", cantidad)
            .input("proveedores_id_proveedor", proveedores_id_proveedor)
            .input("productos_id_producto", productos_id_producto)
            .query(`
                INSERT INTO ordenesDeCompra (fecha, cantidad, proveedores_id_proveedor, productos_id_producto)
                VALUES (@fecha, @cantidad, @proveedores_id_proveedor, @productos_id_producto)
            `);
            
        return { message: "Creada exitosamente" };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getAllOrdens, postOrden, deleteOrden, createOrden, getOrdenByIdProducto };
