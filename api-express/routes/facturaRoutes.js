const express = require("express");
const { getFacturaById, getFacturaByClienteId, getFacturas } = require("../controllers/facturaController");

const router = express.Router();

router.get('/', getFacturas);
router.get('/:id', getFacturaById);
router.get('/cliente/:id', getFacturaByClienteId);


module.exports = router;
