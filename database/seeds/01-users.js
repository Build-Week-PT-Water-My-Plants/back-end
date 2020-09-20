
const hashedPassword = "$2a$14$1fvPPk5HE75RHd3eimA7UuWXzhhzktj20kAJiYVY2IwgKtl45Nr7y"

exports.seed = async function(knex) {
 await knex("users").insert([
   {id: 1, username: "plantuser123", phoneNumber:1234567890, password:hashedPassword}
 ])
};
