// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();
const path = require("path");

module.exports = {
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "the-wild-oasis",
    user: "root",
    password: "rootroot",
    charset: "utf8",
  },
  // connection: {
  //   host: process.env.DB_HOST,
  //   database: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   charset: "utf8",
  // },
  migrations: {
    directory: path.join(__dirname, "database/migrations"), // Specify the correct path
  },
  seeds: {
    directory: path.join(__dirname, "database/seeds"), // Specify the correct path
  },
};
