exports.up = function(knex) {
    return knex.schema.createTable('settings', function(table) {
      table.increments('id').primary();
      table.string('key').notNullable().unique();
      table.text('value').notNullable();
      table.boolean('is_encrypted').defaultTo(false);
      table.timestamps(true, true);
      table.boolean('deleted').defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('settings');
  };
  