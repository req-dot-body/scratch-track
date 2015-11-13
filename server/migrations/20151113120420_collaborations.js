exports.up = function(knex, Promise) {
  return knex.schema.createTable('collaborations', function(collab){
  	collab.increments('id').primary();
  	collab.integer('user_id').notNullable()
  		.references('id').inTable('users');
  	collab.integer('project_id').notNullable()
  		.references('id').inTable('projects');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('collaborations');
};