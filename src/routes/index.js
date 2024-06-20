const { Router } = require('express');


const usersRouter = require('./users.routes');
const charactersRouter = require('./characters.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/characters', charactersRouter);

module.exports = routes;