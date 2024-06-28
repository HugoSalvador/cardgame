const { Router } = require('express');

const FormerController = require('../controllers/FormerController');

const formerRoutes = Router();

const formerController = new FormerController();

formerRoutes.post('/:id', formerController.create);

module.exports = formerRoutes;
