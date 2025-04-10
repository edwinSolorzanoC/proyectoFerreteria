const express = require("express");
const { getReporte } = require("../controllers/reporteController");

const router = express.Router();

// Ruta para obtener los reportes según el tipo de consulta (diarias, semanales, mensual)
router.get('/', getReporte);

module.exports = router;
