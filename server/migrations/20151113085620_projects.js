exports.up = function(knex) {
  return knex.schema.createTable('projects', function (project) {
    project.increments('id').primary();
    project.number('owner_id').notNullable()
    	.references('id').inTable('users');
    project.number('created_at').notNullable();
    project.number('updated_at').notNullable();
    project.string('name', 50)
    project.string('description')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
