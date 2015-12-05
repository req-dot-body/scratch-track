
exports.up = function(knex, Promise) {
  return knex.schema.table('stablature', function (table) {
    table.integer('notation', 1)
    .notNullable().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('stablature', function (table) {
    table.dropColumn('notation');
  });
};