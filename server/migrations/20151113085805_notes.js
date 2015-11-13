
exports.up = function(knex) {
  return knex.schema.createTable('notes', function(note){
  	note.increment('id').primary();
  	note.number('project_id').notNullable()
  		.references('id').inTable('projects');
  	note.string('text').notNullable();
  	note.number('created_at').notNullable();
  	note.string('name', 50);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
