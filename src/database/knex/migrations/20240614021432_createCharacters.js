exports.up = knex => knex.schema.createTable('characters', table => {
    table.increments('id');
    table.text('name');
    table.integer('bounty');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('characters');