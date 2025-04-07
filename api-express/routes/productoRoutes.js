const express = require("express");
const { getProductos, addProducto } = require("../controllers/productoController");

const router = express.Router();
//obtener
router.get("/", getProductos);
router.post("/", addProducto);


module.exports = router;
