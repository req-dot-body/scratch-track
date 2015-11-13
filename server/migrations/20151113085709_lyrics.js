
exports.up = function(knex) {
  return knex.schema.createTable('lyrics', function('lyricEntry'){
  	lyricEntry.increment('id').primary();
  	lyricEntry.number('project_id').notNullable()
  		.references('id').inTable('projects');
  	lyricEntry.string('text').notNullable();
  	lyricEntry.number('created_at').notNullable();
  	lyricEntry.string('name', 50);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('lyrics');
};
