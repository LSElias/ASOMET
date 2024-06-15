const express = require("express");
const router = express.Router();

const  datosController = require("../controllers/datosController");

router.get("/asistencia",datosController.getEstAsistencia);
router.get("/confirmacion",datosController.getEstConfirm);
router.get("/usuario",datosController.getEstUsuario);
router.get("/rol",datosController.getRol);

router.get("/idA/:idAsistencia", datosController.getByIdAsistencia);
router.get("/idC/:idEstadoConfir", datosController.getByIdConfirm);
router.get("/idU/:idUsuario", datosController.getByIdUsuario);
router.get("/idR/:idRol", datosController.getByIdRol);

module.exports = router;