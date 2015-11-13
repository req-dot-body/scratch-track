exports.up = function(knex) {
  return knex.schema.createTable('stablature', function(stab){
  	stab.increments('id').primary();
  	stab.integer('project_id').notNullable()
  		.references('id').inTable('projects');
  	stab.string('code').notNullable();
  	stab.integer('created_at').notNullable();
  	stab.string('name', 50);
  	stab.string('description');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('stablature');
};