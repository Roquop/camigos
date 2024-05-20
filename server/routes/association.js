var express = require("express");
const multer = require("../middleware/multer");
const associationControllers = require("../controllers/associationControllers");
var router = express.Router();

// PRUEBA
//localhost:4000/association/getAllAssociations
router.get("/getAllAssociations", associationControllers.getAllAssociations)

//localhost:4000/association/getOneAssociation/association_id
router.get("/getOneAssociation/:association_id", associationControllers.getOneAssociation)

//localhost:4000/association/getAllComments
router.get("/getAllComments/:association_id", associationControllers.getAllComments)
module.exports = router;

// Crea una asociación
//localhost:4000/association/createAssociation/:user_id
router.post("/createAssociation/:user_id", multer("asociaciones"), associationControllers.createAssociation);