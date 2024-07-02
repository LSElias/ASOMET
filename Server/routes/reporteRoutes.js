const express = require("express");
const router = express.Router();

const  reporteController = require("../controllers/reporteController");

router.get("/vs",reporteController.getAsistenciaByEvento);
router.get("/siguiente",reporteController.getAsistenciaSiguienteEvento);
router.get("/menor",reporteController.getMenorAsistencia);
router.get("/mayor",reporteController.getMayorAsistencia);
router.get("/asis",reporteController.getCantidadMayorMenor);


module.exports = router;