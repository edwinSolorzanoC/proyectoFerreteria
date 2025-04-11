const express = require("express");

const {  getReporteProductos,getHistorialCompras } = require("../controllers/reporteController");


const router = express.Router();


router.get("/:id", getHistorialCompras);

router.get('/productos', getReporteProductos);



module.exports = router;
