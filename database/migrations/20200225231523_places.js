exports.up = function(knex) {
  return knex.schema
    .createTable("places", tbl => {
      tbl.increments();
      tbl.text("city", 128).notNullable();
      tbl.text("country", 128).notNullable();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("photo_url");
    })

    .createTable("stories", tbl => {
      tbl.increments();
      tbl
        .integer("place_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("places")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      
      tbl.text("story_photo_url");
      tbl.string("review").notNullable();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("stories")
    .dropTableIfExists("places");
};
