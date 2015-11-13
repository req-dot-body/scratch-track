
exports.up = function(knex, Promise) {
  return knex.schema.createTable('collaborations', function(collab){
  	collab.increments('id').primary();
  	collab.number('user_id').notNullable()
  		.references('id').inTable('users');
  	collab.number('project_id').noteNullable()
  		.references('id').inTable('projects');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('collaborations');
};
