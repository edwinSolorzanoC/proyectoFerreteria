const { poolPromise } = require("../db/config");

const getProductos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Productos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProducto = async (req, res) => {
  const { nombre, precio, cantidad_stock, id_proveedor } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (!nombre || !precio || !cantidad_stock || !id_proveedor) {
    return res.status(400).json({ error: "Nombre, precio, cantidad_stock y id_proveedor son requeridos." });
  }

  // Validar que los campos numéricos sean correctos
  if (isNaN(precio) || isNaN(cantidad_stock) || isNaN(id_proveedor)) {
    return res.status(400).json({ error: "Precio, cantidad_stock y id_proveedor deben ser números válidos." });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', nombre)
      .input('precio', precio)
      .input('cantidad_stock', cantidad_stock)
      .input('id_proveedor', id_proveedor)
      .query(`
        INSERT INTO Productos (nombre, precio, cantidad_stock, id_proveedor)
        VALUES (@nombre, @precio, @cantidad_stock, @id_proveedor);
      `);

    res.status(201).json({ message: "Producto agregado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductos, addProducto };
