exports.up = function(knex, Promise) {
  return knex.schema.createTable('recordings', function(recording){
  	recording.increments('id').primary();
  	recording.integer('project_id').notNullable()
  		.references('id').inTable('projects');
  	recording.string('url').notNullable();
  	recording.integer('created_at').notNullable();
  	recording.string('name', 50);
  	recording.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recordings');
};
