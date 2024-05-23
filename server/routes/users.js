var express = require("express");
const userControllers = require("../controllers/userControllers");
var router = express.Router();

// Registrar un usuario
//localhost:4000/users/register
router.post("/register", userControllers.register)

// Hacer login
//localhost:4000/users/login
router.post(`/login`, userControllers.login)

// Traer la información de un usuario
//localhost:4000/users/getOneuser/:user_id
router.get("/getOneUser/:user_id", userControllers.getOneUser)

// Traer todos los comentarios hechos por un usuario
//localhost:4000/users/getAllComments/:user_id
router.get("/getAllComments/:user_id", userControllers.getAllComments)

// Postear un comentario en una asociación, aquí requerimos dos parámetros
//localhost:4000/users/postComment/:user_id/:association_id
router.post("/postComment/:user_id/:association_id", userControllers.postComment)

// Guardar un puzzle
//localhost:4000/users/savePuzzle/:user_id/
router.post("/savePuzzle/:user_id", userControllers.savePuzzle)

// Ver todos los puzzles
//localhost:4000/users/getAllPuzzles/:user_id/
router.get("/getAllPuzzles/:user_id", userControllers.getAllPuzzles)

module.exports = router;