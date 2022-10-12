/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('teams', table => {
        table.increments('id'); 
        table.string('logoURL'); 
        table.text('name'); 
        table.string('members'); 
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('teams')
};
