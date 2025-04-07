const { poolPromise } = require("../db/config");

const getProveedores = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Proveedores");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addProveedor = async (req, res) => {
  const { nombre, contacto, telefono, direccion } = req.body;

  if (!nombre || !telefono || !direccion) {
    return res.status(400).json({ error: "Nombre, teléfono y dirección son requeridos." });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', nombre)
      .input('contacto', contacto)
      .input('telefono', telefono)
      .input('direccion', direccion)
      .query(`
        INSERT INTO Proveedores (nombre, contacto, telefono, direccion)
        VALUES (@nombre, @contacto, @telefono, @direccion);
      `);

    res.status(201).json({ message: "Proveedor agregado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProveedores, addProveedor };

