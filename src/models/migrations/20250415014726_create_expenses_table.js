exports.up = function(knex) {
    return knex.schema.createTable('expenses', function(table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects');
      table.decimal('amount', 15, 2).notNullable();
      table.date('expense_date').notNullable();
      table.string('description').nullable();
      table.string('file_path').nullable(); // path gambar atau nota
      table.integer('created_by').unsigned().references('id').inTable('users');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('expenses');
  };
  