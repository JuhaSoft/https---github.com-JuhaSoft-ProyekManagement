exports.up = function(knex) {
    return knex.schema.createTable('budgets', function(table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects');
      table.decimal('amount', 15, 2).notNullable();
      table.decimal('limit_percentage', 5, 2).defaultTo(90.00); // warning batas maksimal belanja
      table.integer('created_by').unsigned().references('id').inTable('users');
      table.text('notes').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('budgets');
  };
  