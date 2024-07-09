const express = require("express");
const router = express.Router();

const  asistenciaControllers = require("../controllers/asistenciaControllers");

//Prueba Reportes  
router.post("/crear", asistenciaControllers.create);


module.exports = router;