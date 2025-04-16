exports.up = function(knex) {
    return knex.schema.createTable('project_members', function(table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned().references('id').inTable('projects');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.boolean('receive_email').defaultTo(true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('project_members');
  };
  