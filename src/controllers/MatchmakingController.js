const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MatchmakingController {
    async match(req, res) {
        const { nameChallengedTeam } = req.body;

        const { id } = req.params;

        const [ challengedTeam ] = await knex('teams').whereLike('name', `%${nameChallengedTeam}%`);

        const  [ challengedInfo ]  = await knex('characters_teams').where({ team_id: challengedTeam.id });

        const challengerComposition = await knex('characters_teams')
            .select(
            'characters.id as character_id',
            'characters.name as character_name',
            'characters.bounty as character_bounty',
            'teams.id as team_id',
            'teams.name as team_name'
            )
            .innerJoin('characters', 'characters_teams.character_id', 'characters.id')
            .innerJoin('teams', 'characters_teams.team_id', 'teams.id')
            .where('teams.id', id);
        
        const challengerTeamValue = challengerComposition.map((data) => {
            const cleanedStr = data.character_bounty.replace(/\./g, '');
            return Number(cleanedStr);
        });  

        const challengerTotal = challengerTeamValue.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const challengedComposition = await knex('characters_teams')
            .select(
            'characters.id as character_id',
            'characters.name as character_name',
            'characters.bounty as character_bounty',
            'teams.id as team_id',
            'teams.name as team_name'
            )
            .innerJoin('characters', 'characters_teams.character_id', 'characters.id')
            .innerJoin('teams', 'characters_teams.team_id', 'teams.id')
            .where('teams.id', challengedInfo.team_id);

        const challengedTeamValue = challengedComposition.map((data) => {
            const cleanedStr = data.character_bounty.replace(/\./g, '');
            return Number(cleanedStr);
        });
        
        const challengedTotal = challengedTeamValue.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        if (challengerTotal > challengedTotal) {
            return res.status(200).send({'message': 'The challenger team WON '});
        }

        if (challengedTotal > challengerTotal) {
            return res.status(200).send({'message': 'The challenged team WON '});
        }   

        return res.status(200).send({'message': 'The game has DRAW'});
    }         
}


module.exports = MatchmakingController;