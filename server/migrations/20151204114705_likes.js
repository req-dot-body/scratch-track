exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', function(like){
  	like.increments('id').primary();
  	like.integer('user_id').notNullable()
  		.references('id').inTable('users');
  	like.integer('project_id').notNullable()
  		.references('id').inTable('projects');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes');
};
