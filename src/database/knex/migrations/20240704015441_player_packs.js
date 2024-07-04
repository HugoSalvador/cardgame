exports.up = knex => knex.schema.createTable('player_packs', table => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users')
    table.timestamp('next_claim_at');
    table.boolean('claimed');
});

exports.down = knex => knex.schema.dropTable('characters_teams');