exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.string('project_number').unique().notNullable();
      table.string('orderNumber').nullable();
      table.string('name').notNullable();
      table.text('description').nullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.string('customer_name').nullable();
      table.string('location').nullable();
      table.integer('warning_days_before_deadline').defaultTo(7);
      table.integer('created_by').unsigned().references('id').inTable('users');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('projects');
  };
  