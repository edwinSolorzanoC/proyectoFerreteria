const { poolPromise } = require("../db/config");

// Obtener todos los proveedores
const getProveedores = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM proveedores");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un proveedor nuevo
const addProveedor = async (req, res) => {
  const { nombre, contacto, telefono, direccion } = req.body;

  if (!nombre || !contacto || !telefono || !direccion) {
    return res.status(400).json({ error: "Todos los campos (nombre, contacto, telefono, direccion) son requeridos." });
  }

  try {
    const pool = await poolPromise;

    const checkDuplicate = await pool.request()
      .input('nombre', nombre)
      .query("SELECT COUNT(*) AS count FROM proveedores WHERE nombre = @nombre");

    if (checkDuplicate.recordset[0].count > 0) {
      return res.status(400).json({ error: "Ya existe un proveedor con ese nombre." });
    }

    await pool.request()
      .input('nombre', nombre) 
      .input('contacto', contacto) 
      .input('telefono', telefono) 
      .input('direccion', direccion) 
      .query(`
        INSERT INTO proveedores (nombre, contacto, telefono, direccion)
        VALUES (@nombre, @contacto, @telefono, @direccion);
      `);

    res.status(201).json({ message: "Proveedor agregado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar proveedor
const deleteProveedor = async (req, res) => {
  const { id_proveedor } = req.body;

  if (!id_proveedor || isNaN(id_proveedor)) {
    return res.status(400).json({ error: "El ID del proveedor es requerido y debe ser un número válido." });
  }

  try {
    const pool = await poolPromise;

    const checkExistence = await pool.request()
      .input('id_proveedor', id_proveedor)
      .query("SELECT COUNT(*) AS count FROM proveedores WHERE id_proveedor = @id_proveedor");

    if (checkExistence.recordset[0].count === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado." });
    }

    await pool.request()
      .input('id_proveedor', id_proveedor)
      .query("DELETE FROM proveedores WHERE id_proveedor = @id_proveedor");

    res.status(200).json({ message: "Proveedor eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar proveedor
const updateProveedor = async (req, res) => {
  const { id_proveedor, nombre, contacto, telefono, direccion } = req.body;

  if (!id_proveedor || !nombre || !contacto || !telefono || !direccion) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  if (isNaN(id_proveedor)) {
    return res.status(400).json({ error: "El ID del proveedor debe ser un número válido." });
  }

  try {
    const pool = await poolPromise;

    const checkExistence = await pool.request()
      .input('id_proveedor', id_proveedor)
      .query("SELECT COUNT(*) AS count FROM proveedores WHERE id_proveedor = @id_proveedor");

    if (checkExistence.recordset[0].count === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado." });
    }

    await pool.request()
      .input('id_proveedor', id_proveedor)
      .input('nombre', nombre)
      .input('contacto', contacto)
      .input('telefono', telefono)
      .input('direccion', direccion)
      .query(`
        UPDATE proveedores
        SET nombre = @nombre,
            contacto = @contacto,
            telefono = @telefono,
            direccion = @direccion
        WHERE id_proveedor = @id_proveedor;
      `);

    res.status(200).json({ message: "Proveedor actualizado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProveedores, addProveedor, deleteProveedor, updateProveedor };
