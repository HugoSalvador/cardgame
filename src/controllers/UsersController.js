const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');


class UsersController { 
    async create(req, res) {
        const { name, email, password, confirm_password } = req.body;

        const checkEmail = await knex('users').where({email: email});


        if(checkEmail.length > 0) {
            throw new AppError('The e-mail is already in use');
        } 

        if(password !== confirm_password) {
            throw new AppError('The password does not match');
        }

        const hashedPassword = await hash(password, 8);


        await knex('users').insert({
            name,
            email,
            password: hashedPassword 
        });   

        res.json(201, {'message': 'User created successfully'})
    }


    async update(req, res) {
        const { name, email, password, old_password } = req.body;
        const { id } = req.params;

        const [ user ] = await knex('users').where({id: id});

        if (!user) {
            throw new AppError('User not found');
        }
        
        const [ userWithUpdatedEmail ] = await knex('users').where({email: email});


        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError('This e-mails is already in use');
        }
        
        if(password && !old_password) {
            throw new AppError('Enter the old password');
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError('The old password does not match');
            }

            user.password = await hash(password, 8);
        }

        await knex('users').where({id: user.id }).update({
            name: user.name = name ?? user.name,
            email: user.email = email ?? user.email,
            password: user.password
        });

        res.json(200, {'message': 'The user is updated succesfully'})
    }
}

module.exports = UsersController;