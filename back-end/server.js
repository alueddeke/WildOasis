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

const DEFAULT_IMAGE_PATHS = [
  "data/cabins/cabin-001.jpg",
  "data/cabins/cabin-002.jpg",
  "data/cabins/cabin-003.jpg",
  "data/cabins/cabin-004.jpg",
  "data/cabins/cabin-005.jpg",
  "data/cabins/cabin-006.jpg",
  "data/cabins/cabin-007.jpg",
  "data/cabins/cabin-008.jpg",
];

app.post("/api/cabins", (req, res) => {
  const getRandomImagePath = () => {
    const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGE_PATHS.length);
    return DEFAULT_IMAGE_PATHS[randomIndex];
  };

  const newCabin = {
    ...req.body,
    image: getRandomImagePath(),
  };
  console.log("Received data for new cabin:", req.body);

  knex("cabins")
    .insert(newCabin)
    .then(() => {
      res.status(201).json({ message: "Cabin successfully created" });
    })
    .catch((e) => {
      console.error("Error inserting new cabin:", e);
      res.status(500).json({
        error: "Database error occurred while creating new cabin",
        details: e.message,
      });
    });
});

app.put("/api/cabins/:id", (req, res) => {
  const { id } = req.params;
  const { created_at, ...updatedCabin } = req.body;

  knex("cabins")
    .where({ id })
    .update(updatedCabin)
    .then(() => {
      res.status(200).json({ message: "Cabin successfully updated" });
    })
    .catch((e) => {
      console.error("Error updating cabin:", e);
      res.status(500).json({
        error: "Database error occurred while updating the cabin",
        details: e.message,
      });
    });
});

app.get("/api/settings", async (req, res) => {
  try {
    const settings = await knex("settings").first();
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res
      .status(500)
      .json({ error: "Database error occurred while fetching settings" });
  }
});

// app.put("/api/settings", async (req, res) => {
//   const { setting_name, value } = req.body;

//   try {
//     const updated = await knex("settings")
//       .update({ value })
//       .where({ setting_name });

//     if (updated) {
//       const updatedSettings = await knex("settings")
//         .where({ setting_name })
//         .first();
//       res.status(200).json(updatedSettings);
//     } else {
//       res.status(404).json({ error: "Setting not found" });
//     }
//   } catch (error) {
//     console.error("Error updating settings:", error);
//     res
//       .status(500)
//       .json({ error: "Database error occurred while updating settings" });
//   }
// });

app.put("/api/settings", async (req, res) => {
  const updates = req.body;
  console.log("Updating settings with:", req.body);

  try {
    // Assuming your settings table has more than one setting and they are not stored as rows but as columns
    const updated = await knex("settings").update(updates).where("id", 1); // Assuming there's only one settings row

    if (updated) {
      const updatedSettings = await knex("settings").first();
      res.status(200).json(updatedSettings);
    } else {
      res.status(404).json({ error: "Settings not found" });
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({
      error: "Database error occurred while updating settings",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
