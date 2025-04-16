exports.up = function(knex) {
    return knex.schema.createTable('attachments', function(table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned().references('id').inTable('projects');
      table.string('type'); // 'nota', 'dokumentasi', etc
      table.string('file_name').notNullable();
      table.string('file_path').notNullable();
      table.timestamp('uploaded_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('attachments');
  };
  