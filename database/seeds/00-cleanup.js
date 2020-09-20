
exports.seed = function(knex) {
  await knex("plants").truncate()
  await knex("users").truncate()

};
