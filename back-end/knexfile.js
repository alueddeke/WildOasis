require("dotenv").config();
const path = require("path");

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    charset: "utf8",
  },
  migrations: {
    directory: path.join(__dirname, "database/migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "database/seeds"),
  },
};
