const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.getAll);
router.get('/:id', eventoController.getById);
router.post('/crear', eventoController.create);
router.put('/actualizar/:id', eventoController.update);
router.delete('/eliminar/:id', eventoController.delete);

module.exports = router;
