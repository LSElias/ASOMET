const express = require("express");
const router = express.Router();

const  asistenciaControllers = require("../controllers/asistenciaControllers");

router.get('/individual', asistenciaControllers.enviarCorreo_Individual)

//En proceso 
router.put('/:IdEvento', asistenciaControllers.updateAsistenciaByIdEvento);
router.put('/:IdEvento', asistenciaControllers.updateConfirmacionByIdEvento);

router.get('/:idEvento', asistenciaControllers.enviarCorreos_General);

module.exports = router;