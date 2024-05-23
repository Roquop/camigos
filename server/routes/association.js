var express = require("express");
const multer = require("../middleware/multer");
const associationControllers = require("../controllers/associationControllers");
var router = express.Router();
//En este caso también tenemos que requerir multer porque lo pasaremos al controlador de post para la asociación.

// Trae todas las asociaciones
//localhost:4000/association/getAllAssociations
router.get("/getAllAssociations", associationControllers.getAllAssociations)

// Trae la información de una asociación
//localhost:4000/association/getOneAssociation/association_id
router.get("/getOneAssociation/:association_id", associationControllers.getOneAssociation)

// Coge todos los comentarios de una asociación
//localhost:4000/association/getAllComments
router.get("/getAllComments/:association_id", associationControllers.getAllComments)
module.exports = router;

// Crea una asociación, podemos ver como pasamos la librería multer con un paréntesis, donde está el nombre de la carpeta en el cual se guardarán las imágenes que subamos en la ruta que indicamos en el archivo de configuración de multer.
//localhost:4000/association/createAssociation/:user_id
router.post("/createAssociation/:user_id", multer("asociaciones"), associationControllers.createAssociation);