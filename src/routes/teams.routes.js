const { Router } = require('express');

const TeamsController = require('../controllers/TeamsController');

const teamsRoutes = Router();

const teamsController = new TeamsController();

teamsRoutes.post('/:id', teamsController.create);
teamsRoutes.put('/:id', teamsController.update);

module.exports = teamsRoutes;