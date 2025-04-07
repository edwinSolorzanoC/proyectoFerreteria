const express = require("express");
const { getProductos, addProducto,deleteProducto,updateProducto } = require("../controllers/productoController");

const router = express.Router();
//obtener
router.get("/", getProductos);
router.post("/", addProducto);
router.delete("/", deleteProducto);
router.put("/", updateProducto);

module.exports = router;
