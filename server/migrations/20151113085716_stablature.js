
exports.up = function(knex) {
  return knex.schema.createTable('stablature', function(stab){
  	stab.increment('id').primary();
  	stab.number('project_id').notNullable()
  		.reference('id').inTable('projects');
  	stab.string('code').notNullable();
  	stab.number('create_at').notNullable();
  	stab.string('name', 50);
  	stab.string('description');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('stablature');
};
