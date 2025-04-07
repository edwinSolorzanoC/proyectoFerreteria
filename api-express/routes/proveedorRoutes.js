const express = require("express");
const { getProveedores, addProveedor } = require("../controllers/proveedorController");

const router = express.Router();

router.get("/", getProveedores);
router.post("/", addProveedor); // Esta es la nueva ruta para el POST




module.exports = router;
