const express = require("express");
const { getClientes,addCliente,deleteCliente,updateCliente } = require("../controllers/clienteController");

const router = express.Router();

router.get('/', getClientes);

router.post('/', addCliente);

router.delete('/', deleteCliente);

router.put('/', updateCliente);


module.exports = router;
