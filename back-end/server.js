const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const knex = require("knex")(require("./knexfile"));
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "../client")));
console.log(path.join(__dirname, "../client"));

app.get("/api/cabins", (req, res) => {
  knex("cabins")
    .select("*")
    .then((cabins) => {
      res.json(cabins);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: "Database error occurred" });
    });
});
app.delete("/api/cabins/:id", (req, res) => {
  const { id } = req.params;

  knex("cabins")
    .where({ id })
    .del()
    .then((rowsAffected) => {
      if (rowsAffected) {
        res
          .status(200)
          .json({ message: `Cabin with id ${id} successfully deleted` });
      } else {
        res.status(404).json({ error: "Cabin not found" });
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: "Database error occurred" });
    });
});
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
