const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuariosController");

router.get("/", usuarioController.get);

//router.post("/login", usuarioController.login);
router.post("/registrar", usuarioController.create);
router.put("/:idUsuario", usuarioController.update);

router.get("/idU/:idUsuario", usuarioController.getByIdUser);
router.get("/idR/:idRol", usuarioController.getByIdRol);
router.get("/idE/:idEstUsuario", usuarioController.getByIdEstUsuario);
router.get("/idC/:cedula", usuarioController.getByCedula);

module.exports = router;