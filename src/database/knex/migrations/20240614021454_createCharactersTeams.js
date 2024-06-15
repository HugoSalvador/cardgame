exports.up = knex => knex.schema.createTable('characters_teams', table => {
    table.increments('id');

    table.integer('team_id').references('id').inTable('teams')
    table.integer('character_id').references('id').inTable('characters')

});

exports.down = knex => knex.schema.dropTable('characters_teams');