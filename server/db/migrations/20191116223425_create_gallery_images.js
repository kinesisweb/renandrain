exports.up = function(knex) {
  return knex.schema.createTable("gallery_images", table => {
    table.increments("image_id").primary();
    table.string("caption");
    table.integer("gallery_id");
    table.string("filename");
    table.string("file_type", 10);
    table.integer("file_size");
    table.boolean("outline").defaultTo(false);
    table.boolean("contain").defaultTo(false);
    table.integer("cols");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("gallery_images");
};
