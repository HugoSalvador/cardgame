const knex = require('../database/knex');
const AppError = require('../utils/AppError');


class TeamsController {
    async create(req, res) {
        const { name } = req.body;
        const { id } = req.params;

        const [ user ] = await knex('users').where({ id });

        if (!name) {
            throw new AppError('The field name is required');
        }

        if(!user) {
            throw new AppError('User not found');
        }

        await knex('teams').insert({
            name,
            user_id: user.id
        });

        res.status(201).send({'message': 'Team created successfuly'});
    }

    async update(req, res) {
        const { name } = req.body;
        const { id } = req.params;

        const [ user ] = await knex('users').where({ id });

        if(!name) {
            throw new AppError('The field name is required');
        }

        if(!user) {
            throw new AppError('User not found');
        }

        await knex('teams').where({ id: user.id }).update({
            name
        });

        res.status(200).send({'message': 'The teams is updated succesfully'});
    }
}

module.exports = TeamsController;