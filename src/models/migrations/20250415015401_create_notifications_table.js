exports.up = function(knex) {
    return knex.schema.createTable('notifications', function(table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned().references('id').inTable('projects');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('type'); // 'budget_warning', 'deadline_warning'
      table.text('message');
      table.boolean('is_read').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('notifications');
  };
  