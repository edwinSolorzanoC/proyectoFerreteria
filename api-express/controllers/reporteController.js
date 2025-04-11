const { poolPromise } = require("../db/config");

// Obtener reporte diario, semanal o mensual
const getReporte = async (req, res) => {
  const { query } = req.query;  // Obtenemos el parámetro "query" de la consulta

  if (!query) {
    return res.status(400).json({ error: 'Por favor, proporciona el parámetro "query" (diarias, semanales o mensual).' });
  }

  try {
    const pool = await poolPromise;
    let sqlQuery;

    if (query === 'diarias') {
      // Reporte diario
      sqlQuery = "SELECT * FROM facturas WHERE fecha = CAST(GETDATE() AS DATE)";
    } else if (query === 'semanales') {
      // Reporte semanal
      sqlQuery = `
        SELECT * FROM facturas
        WHERE fecha >= CAST(DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 0) AS DATE)
        AND fecha <= CAST(DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()), 6) AS DATE)
      `;
    } else if (query === 'mensual') {
      // Reporte mensual
      sqlQuery = `
        SELECT * FROM facturas
        WHERE YEAR(fecha) = YEAR(GETDATE()) AND MONTH(fecha) = MONTH(GETDATE())
      `;
    } else {
      return res.status(400).json({ error: 'Query no válido. Usa "diarias", "semanales" o "mensual".' });
    }

    const result = await pool.request().query(sqlQuery);
    res.json(result.recordset);  // Devolver los resultados en formato JSON

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

module.exports = { getReporte, getReporteProductos };
