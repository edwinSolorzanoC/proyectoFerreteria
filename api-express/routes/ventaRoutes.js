const express = require("express");
const { createVenta } = require("../controllers/ventaController");

const router = express.Router();

router.post('/', createVenta);


module.exports = router;
