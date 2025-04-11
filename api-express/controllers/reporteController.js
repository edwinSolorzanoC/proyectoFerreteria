const { poolPromise } = require("../db/config");

// Obtener historial de compras con filtro por día, semana, mes o por ID de cliente
const getHistorialCompras = async (req, res) => {
  const { tipo } = req.query; // 'tipo' para dia, semana, mes
  const { id } = req.params; // id del cliente desde la URL

  let filtroFecha = "";
  let filtroIdCliente = "";

  if (id) {
    // Asegurarse de que el ID esté presente en la consulta
    filtroIdCliente = `AND hc.clientes_id_cliente = ${id}`;
  }

  switch (tipo) {
    case "dia":
      filtroFecha = "CAST(hc.fecha AS DATE) = CAST(GETDATE() AS DATE)";
      break;
    case "semana":
      filtroFecha = "DATEPART(WEEK, hc.fecha) = DATEPART(WEEK, GETDATE()) AND YEAR(hc.fecha) = YEAR(GETDATE())";
      break;
    case "mes":
      filtroFecha = "MONTH(hc.fecha) = MONTH(GETDATE()) AND YEAR(hc.fecha) = YEAR(GETDATE())";
      break;
    default:
      filtroFecha = "1=1"; // sin filtro si no se especifica tipo
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT hc.*, c.nombre AS nombre_cliente
      FROM historialCompras_clientes hc
      INNER JOIN clientes c ON hc.clientes_id_cliente = c.id_cliente
      WHERE ${filtroFecha} ${filtroIdCliente}
    `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getReporteProductos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const sqlQuery = `
      SELECT 
        p.nombre AS nombre_producto, 
        SUM(d.cantidad) AS total_vendido
      FROM productos p
      JOIN detalles_facturas d ON p.id_producto = d.productos_id_producto
      GROUP BY p.nombre
    `;
    const result = await pool.request().query(sqlQuery);
    res.json(result.recordset);  // Devolver los resultados en formato JSON
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {  getReporteProductos, getHistorialCompras };
