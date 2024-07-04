const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class PackController {
    async create(req, res) {
        const { id } = req.params;
        
        const user = await knex('users').where({ id }).first();
        console.log(user);

        if(!user) {
            throw new AppError('User does not exists');
        }
        
       for(let i = 0; i < 5; i++) {
            const [ randomCharacter ] = await knex.raw('SELECT * from characters ORDER BY RANDOM() LIMIT 1');
            console.log(randomCharacter);
            
            await knex('player_cards').insert({
                player_id: user.id,
                character_id: randomCharacter.id,
                level: 0,
                bounty: randomCharacter.bounty
            });
       }

       res.status(201).send({'message': 'The pack open as succesfully'});

    }   

    async index(req, res) {
        const user_cards = await knex('player_cards');

        return res.status(200).json(user_cards);
    }



    async show(req, res) {
        const { id } = req.params;

        const user_card = await knex('player_cards').where({ id }).first();

        return res.status(200).json(user_card);
    }
}

module.exports = PackController; 