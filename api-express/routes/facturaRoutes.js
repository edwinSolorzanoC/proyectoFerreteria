const express = require("express");
const { getFacturaById, postFactura } = require("../controllers/facturaController");

const router = express.Router();

router.get('/:id', getFacturaById);
router.post('/', postFactura);


module.exports = router;
