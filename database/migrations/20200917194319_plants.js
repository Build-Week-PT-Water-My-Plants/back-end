
exports.up = async function(knex) {
  await knex.schema.createTable("plants", (table) => {
    table.increments("id")
    table.text("nickname").notNull()
    table.text("species").notNull()
    table.text("h2oFrequency").notNull()
  })
};

exports.down = async function(knex) {
  
};
