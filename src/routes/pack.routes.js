const { Router } = require('express');

const PackController = require('../controllers/PackController');

const packRoutes = Router();

const packController = new PackController();

packRoutes.post('/:id', packController.create);
packRoutes.get('/', packController.index);
packRoutes.get('/:id', packController.show);

module.exports = packRoutes;