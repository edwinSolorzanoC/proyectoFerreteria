const express = require("express");
const { getFacturaById, getFacturaByClienteId } = require("../controllers/facturaController");

const router = express.Router();

router.get('/:id', getFacturaById);
router.get('/cliente/:id', getFacturaByClienteId);


module.exports = router;
