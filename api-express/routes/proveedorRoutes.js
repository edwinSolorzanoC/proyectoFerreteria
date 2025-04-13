const express = require("express");
const { getProveedores, addProveedor,deleteProveedor,updateProveedor } = require("../controllers/proveedorController");

const router = express.Router();


router.get("/", getProveedores);

router.post("/", addProveedor);

router.delete("/", deleteProveedor);

router.put("/", updateProveedor);




module.exports = router;
