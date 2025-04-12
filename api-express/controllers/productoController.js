const { poolPromise } = require("../db/config");

// Obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM productos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un producto nuevo
const addProducto = async (req, res) => {
  const { nombre, precio, cantidad_stock, id_proveedor } = req.body;

  if (!nombre || !precio || !cantidad_stock || !id_proveedor) {
    return res.status(400).json({ error: "Nombre, precio, cantidad_stock y id_proveedor son requeridos." });
  }

  if (isNaN(precio) || isNaN(cantidad_stock) || isNaN(id_proveedor)) {
    return res.status(400).json({ error: "Precio, cantidad_stock y id_proveedor deben ser números válidos." });
  }

  try {
    const pool = await poolPromise;

    const checkDuplicate = await pool.request()
      .input('nombre', nombre)
      .query("SELECT COUNT(*) AS count FROM productos WHERE nombre = @nombre");

    if (checkDuplicate.recordset[0].count > 0) {
      return res.status(400).json({ error: "Ya existe un producto con ese nombre." });
    }

    await pool.request()
      .input('nombre', nombre)
      .input('precio', precio)
      .input('cantidad_stock', cantidad_stock)
      .input('stock_minimo', stock_minimo)
      .input('id_proveedor', id_proveedor)
      .query(`
        INSERT INTO productos (nombre, precio, cantidad_stock, stock_minimo, id_proveedor)
        VALUES (@nombre, @precio, @cantidad_stock, @stock_minimo, @id_proveedor);
      `);

    res.status(201).json({ message: "Producto agregado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
const deleteProducto = async (req, res) => {
  const { id_producto } = req.body;

  if (!id_producto || isNaN(id_producto)) {
    return res.status(400).json({ error: "El ID del producto es requerido y debe ser un número válido." });
  }

  try {
    const pool = await poolPromise;

    const checkExistence = await pool.request()
      .input('id_producto', id_producto)
      .query("SELECT COUNT(*) AS count FROM productos WHERE id_producto = @id_producto");

    if (checkExistence.recordset[0].count === 0) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    await pool.request()
      .input('id_producto', id_producto)
      .query("DELETE FROM productos WHERE id_producto = @id_producto");

    res.status(200).json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar producto
const updateProducto = async (req, res) => {
  const { id_producto, nombre, precio, cantidad_stock, id_proveedor } = req.body;

  if (!id_producto || !nombre || !precio || !cantidad_stock || !id_proveedor) {
    return res.status(400).json({ error: "id_producto, nombre, precio, cantidad_stock y id_proveedor son requeridos." });
  }

  if (isNaN(id_producto) || isNaN(precio) || isNaN(cantidad_stock) || isNaN(id_proveedor)) {
    return res.status(400).json({ error: "id_producto, precio, cantidad_stock y id_proveedor deben ser números válidos." });
  }

  try {
    const pool = await poolPromise;

    const checkExistence = await pool.request()
      .input('id_producto', id_producto)
      .query("SELECT COUNT(*) AS count FROM productos WHERE id_producto = @id_producto");

    if (checkExistence.recordset[0].count === 0) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    await pool.request()
      .input('id_producto', id_producto)
      .input('nombre', nombre)
      .input('precio', precio)
      .input('cantidad_stock', cantidad_stock)
      .input('stock_minimo', stock_minimo)
      .input('id_proveedor', id_proveedor)
      .query(`
        UPDATE productos
        SET nombre = @nombre,
            precio = @precio,
            cantidad_stock = @cantidad_stock,
            stock_minimo = @stock_minimo,
            id_proveedor = @id_proveedor
        WHERE id_producto = @id_producto;
      `);

    res.status(200).json({ message: "Producto actualizado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductos, addProducto, deleteProducto, updateProducto };
