exports.up = knex => knex.schema.createTable('player_cards', table => {
    
    table.increments('id');
    table.integer('player_id').references('id').inTable('users');
    table.integer('character_id').references('id').inTable('characters');
    table.integer('level');
    table.integer('bounty');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable('player_cards');