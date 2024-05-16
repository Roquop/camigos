var express = require("express");
const multerSingle = require("../middleware/multerSingle");
const userControllers = require("../controllers/userControllers");
var router = express.Router();

// Registrar un usuario
//localhost:4000/users/register
router.post("/register", userControllers.register)

//localhost:4000/users/login
router.post(`/login`, userControllers.login)

//localhost:4000/users/getOneuser/:user_id
router.get("/getOneUser/:user_id", userControllers.getOneUser)
module.exports = router;

//localhost:4000/users/getAllComments/:user_id
router.get("/getAllComments/:user_id", userControllers.getAllComments)
module.exports = router;