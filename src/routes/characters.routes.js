 const { Router } = require('express');

 const CharactersController = require('../controllers/CharactersController');

 const charactersRoutes = Router();

 const charactersController = new CharactersController();

 charactersRoutes.post('/', charactersController.create);


 module.exports = charactersRoutes;