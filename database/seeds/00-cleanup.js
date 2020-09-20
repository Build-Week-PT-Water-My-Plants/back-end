
exports.seed = async function(knex) {
  await knex("plants").truncate()
  await knex("users").truncate()
};
