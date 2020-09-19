
exports.seed = async function(knex) {
  await knex("plants").truncate()
  
  return knex('plants').insert([
    {nickname: 'Medusa', species: 'Snake Plant', h2oFrequency: "1x every ten days", user_id: 1},
    {nickname: 'Morgan Treeman', species: 'Bonsai Tree', h2oFrequency: "1x per week", user_id: 1},
    {nickname: 'Spike', species: 'Cactus', h2oFrequency: "1x every 2 weeks", user_id: 1},
    {nickname: 'Blue Ivy Carter', species: 'Ivy', h2oFrequency: "2-3x per week", user_id: 1},
  ])
};
