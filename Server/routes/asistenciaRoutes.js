const express = require("express");
const router = express.Router();

const  asistenciaControllers = require("../controllers/asistenciaControllers");

//Múltiple 
router.post("/crear", asistenciaControllers.create);

//Simple 
router.post("/crearSimple", asistenciaControllers.createSimple);


module.exports = router;