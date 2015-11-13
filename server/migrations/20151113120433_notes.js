exports.up = function(knex) {
  return knex.schema.createTable('notes', function(note){
  	note.increments('id').primary();
  	note.integer('project_id').notNullable()
  		.references('id').inTable('projects');
  	note.string('text').notNullable();
  	note.integer('created_at').notNullable();
  	note.string('name', 50);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};