/** Common config for bookstore. */
require('dotenv').config();

let username = process.env.DATABASE_USERNAME;
let password = process.env.DATABASE_PASSWORD;
let DB_URI = `postgresql://${username}:${password}@localhost`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/books-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
}


module.exports = { DB_URI };