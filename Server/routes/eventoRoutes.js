const express = require('express');
const router = express.Router();
const eventoController = require('./eventoController');

router.get('/eventos', eventoController.getAll);
router.get('/eventos/:id', eventoController.getById);
router.post('/eventos', eventoController.create);
router.put('/eventos/:id', eventoController.update);
router.delete('/eventos/:id', eventoController.delete);

module.exports = router;
