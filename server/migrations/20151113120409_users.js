exports.up = function(knex) {
  return knex.schema.createTable('users', function (user) {
    user.increments('id').primary();
    user.string('password', 25);
    user.string('email', 25).unique().notNullable();
    user.string('first', 25).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};