
exports.up = function(knex, Promise) {
  return knex.schema.table('projects', function (table) {
    table.integer('private', 1)
    .notNullable().defaultTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('projects', function (table) {
    table.dropColumn('private');
  });
};
