const express = require("express");
<<<<<<< HEAD
const { getHistorialCompras } = require("../controllers/reporteController");
=======
const { getReporte, getReporteProductos } = require("../controllers/reporteController");
>>>>>>> 25bcb9033499242073a954aa8ac207799080aff5

const router = express.Router();


router.get("/:id", getHistorialCompras);

// Ruta para obtener los reportes según el tipo de consulta (diarias, semanales, mensual)
<<<<<<< HEAD

=======
router.get('/', getReporte);
router.get('/productos', getReporteProductos);
>>>>>>> 25bcb9033499242073a954aa8ac207799080aff5

module.exports = router;
