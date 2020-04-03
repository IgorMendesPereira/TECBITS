
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('user_id').primary()    
        table.string('name').notNullable()
        table.string('password').notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
