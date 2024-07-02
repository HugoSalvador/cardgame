const { Router } = require('express');

const usersRouter = require('./users.routes');
const charactersRouter = require('./characters.routes');
const teamsRouter = require('./teams.routes');
const formerRouter = require('./former.routes');
const matchmakingRouter = require('./matchmaking.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/characters', charactersRouter);
routes.use('/teams', teamsRouter);
routes.use('/former', formerRouter);
routes.use('/match', matchmakingRouter);

module.exports = routes;