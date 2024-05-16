var express = require("express");
const multerSingle = require("../middleware/multerSingle");
const userControllers = require("../controllers/userControllers");
var router = express.Router();

// Registrar un usuario
//localhost:4000/users/register
router.post("/register", userControllers.register)

module.exports = router;
