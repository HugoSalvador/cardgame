const knex = require('../database/knex');
const AppError = require('../utils/AppError');



class FormerController {
    async create(req, res) {
        let i = 0;

        const { id } = req.params;

        const [ team ] = await knex('teams').where({ id });

        const verifyTeam = await knex('characters_teams').where({ team_id: team.id });
        console.log(verifyTeam);

        if(!id){
            throw new AppError('The parameters is required');
        }

        if(!team){
            throw new AppError('Team not found');
        }

        if(verifyTeam.length > 0) {
            throw new AppError('The composition has formed for this teams');
        }
        
        while (i < 3) {
            const [ randomCharacter ] = await knex.raw('SELECT * FROM characters ORDER BY RANDOM() LIMIT 1');

            await knex('characters_teams').insert({
                team_id: team.id,
                character_id: randomCharacter.id
            });

            i++
        }
        res.status(201).send({'message': 'The team formers as successfuly'});
    }

}

module.exports = FormerController;