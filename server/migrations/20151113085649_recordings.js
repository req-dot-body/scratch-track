
exports.up = function(knex, Promise) {
  return knex.schema.creatTable('recordings', function(recording){
  	recording.increment('id').primary();
  	recording.number('project_id').notNullable()
  		.references('id').inTable('projects');
  	recording.string('url').notNullable();
  	recording.number('created_at').notNullable();
  	recording.string('name', 50);
  	recording.string('desciption');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recordings');
};
