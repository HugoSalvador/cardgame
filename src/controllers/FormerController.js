const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let i = 0;


class FormerController {


    async create(req, res) {
        const { id } = req.params;

        const [ team ] = await knex('teams').where({ id });

        const verifyTeam = await knex('characters_teams').where({ team_id: team.id });

        

        if(!id){
            throw new AppError('The parameters is required');
        }

        if(!team){
            throw new AppError('Team not found');
        }

        if(verifyTeam) {
            throw new AppError('It is not possible generate more than one compositon');
        }


        while (i < 3) {
            const randomId = getRandomNumber(777, 917);

            const verifyCharacter = await knex('characters_teams').where({ character_id: randomId });

            const [ character ] = await knex('characters').where({id: randomId});

            await knex('characters_teams').insert({
                team_id: team.id,
                character_id: character.id
            });

            i++
        }

        res.status(201).send({'message': 'The team formers as successfuly'});

    }





}

module.exports = FormerController;