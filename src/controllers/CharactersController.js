const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const axios = require('axios');

const apiUrl = process.env.URL;

class CharactersController {
    async create(req, res) {
        const getAllCharacters = await axios.get(apiUrl);

        console.log(getAllCharacters[0].id);
      



    }



}


module.exports = CharactersController;












