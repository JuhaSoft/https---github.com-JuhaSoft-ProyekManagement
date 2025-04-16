exports.up = function(knex) {
    return knex.schema.createTable('sub_projects', function(table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned().references('id').inTable('projects');
      table.string('name').notNullable();
      table.text('description').nullable();
      table.date('start_date');
      table.date('end_date');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sub_projects');
  };
  