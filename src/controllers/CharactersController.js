const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const axios = require('axios');

const apiUrl = process.env.URL;

class CharactersController {
    async create(req, res) {
        const getAllCharacters = await axios.get(apiUrl);
       
        getAllCharacters.data.forEach(async (character) => {
            if(!character.bounty) {
                return
            }

            await knex('characters').insert({
                name: character.name,
                bounty: character.bounty
            });

        });

        res.status(201).send({message: 'Criado com sucesso'});
    }



}


module.exports = CharactersController;












