const express = require("express");
const router = express.Router();

const  reporteController = require("../controllers/reporteController");

//Reportes 
router.get("/presentes",reporteController.getAsistencia);
router.get("/ausencias",reporteController.getAusencia);
router.get("/faltas",reporteController.getNollegaron);
router.get("/noasistencias",reporteController.getNoAsistencia);

module.exports = router;