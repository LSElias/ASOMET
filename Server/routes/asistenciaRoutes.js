const express = require("express");
const router = express.Router();

const  asistenciaController = require("../controllers/asistenciaController");

//Reportes 
router.get("/presentes",asistenciaController.getAsistencia);
router.get("/ausencias",asistenciaController.getAusencia);
router.get("/faltas",asistenciaController.getNollegaron);
router.get("/noasistencias",asistenciaController.getNoAsistencia);

module.exports = router;