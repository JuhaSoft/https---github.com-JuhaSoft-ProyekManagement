exports.up = function(knex) {
    return knex.schema.createTable('history_logs', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('action'); // insert, update, delete, etc
      table.string('entity'); // e.g., 'project', 'budget'
      table.integer('entity_id');
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('history_logs');
  };
  