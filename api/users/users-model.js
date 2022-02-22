const db = require("../../data/db-config");

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */

async function find() {
  const users = await db("users")
    .select("user_id", "username")
    .orderBy("user_id");
  return users;
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  const usersByFilter = await db("users").where(filter).orderBy("user_id");
  return usersByFilter;
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const userById = await db("users").where("user_id", user_id).first();
  return {
    user_id: userById.user_id,
    username: userById.username,
  };
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const [createUser] = await db("users").insert(user);
  const createdUser = await findById(createUser);
  return {
    user_id: createdUser.user_id,
    username: createdUser.username,
  };
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add,
};
