exports.up = function(knex) {
  return knex.schema.createTable('users', function (user) {
    user.increments('id').primary();
    user.string('password');
    user.string('email', 255).unique().notNullable();
    user.string('first', 25).notNullable();
    user.string('last', 25).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
