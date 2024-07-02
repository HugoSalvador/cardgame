const { Router } = require('express');

const MatchmakingController = require('../controllers/MatchmakingController');

const matchmakingRoutes = Router();

const matchmakingController = new MatchmakingController();



matchmakingRoutes.post('/:id', matchmakingController.match);

module.exports = matchmakingRoutes;