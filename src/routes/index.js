const { Router } = require('express');

const usersRouter = require('./users.routes');
const charactersRouter = require('./characters.routes');
const matchmakingRouter = require('./matchmaking.routes');
const packRouter = require('./pack.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/characters', charactersRouter);
routes.use('/match', matchmakingRouter);
routes.use('/pack', packRouter);

module.exports = routes;