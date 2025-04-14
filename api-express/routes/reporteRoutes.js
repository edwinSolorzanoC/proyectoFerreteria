const express = require("express");

const {  getReporteProductos,getHistorialCompras } = require("../controllers/reporteController");


const router = express.Router();


router.get("/historial", getHistorialCompras);

router.get('/productos', getReporteProductos);



module.exports = router;
