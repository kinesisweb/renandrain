exports.up = function(knex) {
  return knex.schema.createTable("galleries", table => {
    table.increments("gallery_id").primary();
    table.string("title");
    table.string("category");
    table.string("description");
    table.string("path");
    table.integer("cols");
    table.integer("width");
    table.integer("height");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("galleries");
};
