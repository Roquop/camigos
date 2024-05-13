var express = require("express");
const adminControllers = require("../../controllers/users/adminControllers");
var router = express.Router();

// PRUEBA
//localhost:4000/users/admin/prueba
router.get("/prueba", adminControllers.prueba)

module.exports = router;
