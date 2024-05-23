var express = require("express");
const adminControllers = require("../../controllers/users/adminControllers");
var router = express.Router();
//Como antes, aunque no haya ningún controlador útil aquí, nos sirve para explicar la arquitectura. En todos los archivos de ruta de los controladores requeriremos express, que es con lo que hemos creado el back, llamaremos al archivo de controladores donde estén los que hemos creado, y a router, que es lo que define la arquitectura del back y que veremos más tarde.

//Para entender yo mismo mi trabajo, siempre pongo encima de cada ruta a qué controlador llama y su dirección completa para acceder desde el front.
// PRUEBA
//localhost:4000/users/admin/prueba
router.get("/prueba", adminControllers.prueba)

module.exports = router;
