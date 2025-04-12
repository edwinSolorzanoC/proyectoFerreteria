const express = require("express");
const { getAllOrdens, postOrden, deleteOrden } = require("../controllers/ordenController");

const router = express.Router();

router.get("/", getAllOrdens);
router.post("/", postOrden);
router.delete("/:id", deleteOrden);


module.exports = router;
