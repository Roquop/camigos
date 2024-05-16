var express = require("express");
const associationControllers = require("../controllers/associationControllers");
var router = express.Router();

// PRUEBA
//localhost:4000/association/getAllAssociations
router.get("/getAllAssociations", associationControllers.getAllAssociations)

//localhost:4000/association/getOneAssociation/association_id
router.get("/getOneAssociation/:association_id", associationControllers.getOneAssociation)

module.exports = router;