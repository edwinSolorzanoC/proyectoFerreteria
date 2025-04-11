const express = require("express");
const { getHistorialCompras } = require("../controllers/reporteController");

const router = express.Router();


router.get("/:id", getHistorialCompras);

// Ruta para obtener los reportes según el tipo de consulta (diarias, semanales, mensual)


module.exports = router;
