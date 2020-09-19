
exports.seed = async function(knex) {
 await knex("users").truncate()

 await knex("users").insert([
   {username: "plantuser", phoneNumber:1234567890, password:"123456"}
 ])
};
