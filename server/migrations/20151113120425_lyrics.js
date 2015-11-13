
exports.up = function(knex) {
  return knex.schema.createTable('lyrics', function(lyricEntry){
  	lyricEntry.increments('id').primary();
  	lyricEntry.integer('project_id').notNullable()
  		.references('id').inTable('projects');
  	lyricEntry.string('text').notNullable();
  	lyricEntry.integer('created_at').notNullable();
  	lyricEntry.string('name', 50);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('lyrics');
};