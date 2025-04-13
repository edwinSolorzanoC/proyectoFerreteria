const { poolPromise } = require("../db/config");

// Obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM clientes");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un cliente nuevo
const addCliente = async (req, res) => {
  const { nombre, correo, telefono, direccion } = req.body;

  if (!nombre || !correo || !telefono || !direccion) {
    return res.status(400).json({ error: "Nombre, correo, telefono y direccion son requeridos." });
  }

  try {
    const pool = await poolPromise;

    const checkDuplicate = await pool.request()
      .input('correo', correo)
      .query("SELECT COUNT(*) AS count FROM clientes WHERE correo = @correo");

    if (checkDuplicate.recordset[0].count > 0) {
      return res.status(400).json({ error: "Ya existe un cliente con ese correo." });
    }

    await pool.request()
      .input('nombre', nombre)
      .input('correo', correo)
      .input('telefono', telefono)
      .input('direccion', direccion)
      .query(`
        INSERT INTO clientes (nombre, correo, telefono, direccion)
        VALUES (@nombre, @correo, @telefono, @direccion);
      `);

    res.status(201).json({ message: "Cliente agregado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cliente
const deleteCliente = async (req, res) => {
  const { id_cliente } = req.body;

  if (!id_cliente || isNaN(id_cliente)) {
    return res.status(400).json({ error: "El ID del cliente es requerido y debe ser un número válido." });
  }

  try {
    const pool = await poolPromise;

    const checkExistence = await pool.request()
      .input('id_cliente', id_cliente)
      .query("SELECT COUNT(*) AS count FROM clientes WHERE id_cliente = @id_cliente");

    if (checkExistence.recordset[0].count === 0) {
      return res.status(404).json({ error: "Cliente no encontrado." });
    }

    await pool.request()
      .input('id_cliente', id_cliente)
      .query("DELETE FROM clientes WHERE id_cliente = @id_cliente");

    res.status(200).json({ message: "Cliente eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cliente
const updateCliente = async (req, res) => {
  const { id_cliente, nombre, correo, telefono, direccion } = req.body;

  if (!id_cliente || !nombre || !correo || !telefono || !direccion) {
    return res.status(400).json({ error: "id_cliente, nombre, correo, telefono y direccion son requeridos." });
  }

  if (isNaN(id_cliente)) {
    return res.status(400).json({ error: "id_cliente debe ser un número válido." });
  }

  try {
    const pool = await poolPromise;

    const checkExistence = await pool.request()
      .input('id_cliente', id_cliente)
      .query("SELECT COUNT(*) AS count FROM clientes WHERE id_cliente = @id_cliente");

    if (checkExistence.recordset[0].count === 0) {
      return res.status(404).json({ error: "Cliente no encontrado." });
    }

    await pool.request()
      .input('id_cliente', id_cliente)
      .input('nombre', nombre)
      .input('correo', correo)
      .input('telefono', telefono)
      .input('direccion', direccion)
      .query(`
        UPDATE clientes
        SET nombre = @nombre,
            correo = @correo,
            telefono = @telefono,
            direccion = @direccion
        WHERE id_cliente = @id_cliente;
      `);

    res.status(200).json({ message: "Cliente actualizado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getClientes, addCliente, deleteCliente, updateCliente };
