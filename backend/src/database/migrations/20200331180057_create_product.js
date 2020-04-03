
exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.string('product_id').primary()
        table.string('product_name').notNullable() 
        table.string('description').notNullable()
        table.string('value').notNullable()
        table.string('amount').notNullable()
        //table.specificType('img', 'longblob').notNullable()

        table.string('fk_user_id').notNullable()

        table.foreign('fk_user_id').references('user_id').inTable('users')
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
