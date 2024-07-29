const express = require("express");
const router = express.Router();

const  asistenciaControllers = require("../controllers/asistenciaControllers");

router.post('/:eventoId/confirmar', asistenciaControllers.confirmarAsistencia);
router.post('/:eventoId/rechazar', asistenciaControllers.rechazarAsistencia);

module.exports = router;