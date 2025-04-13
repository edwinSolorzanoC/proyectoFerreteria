const express = require("express");
const { getLogin, registerNewUser } = require("../controllers/authController");

const router = express.Router();

router.get('/login', getLogin);
router.post('/register', registerNewUser);


module.exports = router;
