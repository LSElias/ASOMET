const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.getAll);
router.get('/buscarPorTitulo', eventoController.searchByTitle);
router.get('/recientes', eventoController.getActiveEventos);
router.get('/fecha', eventoController.getByFecha);
router.get('/:id', eventoController.getById);

//Reportes -->Datos Evento Fijos
router.post('/crear', eventoController.create);
//Datos Dinámicos
router.post('/crearEventoAsis', eventoController.createEvent_Asistencia);
router.put('/actualizar/:id', eventoController.update);
router.put('/asistencia/:idEvento', eventoController.updateAsistencia);
router.delete('/eliminar/:id', eventoController.delete);



module.exports = router;
