
exports.up = async function(knex) {
  await knex.schema.createTable("plants", (table) => {
    table.increments("id")
    table.text("nickname").notNull()
    table.text("species").notNull()
    table.text("h2oFrequency").notNull()
    table.integer("user_id")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("users")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("plants")
};
