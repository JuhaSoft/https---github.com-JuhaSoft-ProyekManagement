exports.up = function (knex) {
    return knex.schema.createTable('budget_logs', function (table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects');
      table.bigInteger('old_budget').notNullable();
      table.bigInteger('new_budget').notNullable();
      table.string('reason').notNullable();
      table.integer('changed_by').unsigned().notNullable().references('id').inTable('users');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('budget_logs');
  };
  