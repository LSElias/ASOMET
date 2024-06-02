//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const generoController = require("../controllers/generoController");

//Definición de rutas para generos
router.get("/", generoController.get);

router.get("/:id", generoController.getById);

module.exports = router;
