const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const bodyParser = require("body-parser");
const knexConfig = require("./knexfile");
const moment = require("moment");

console.log("Environment Variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

const knex = require("knex")(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = process.env.PORT || 3000;
const app = express();
const PAGE_SIZE = 10;
app.use(cors());

app.use(bodyParser.json());

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Endpoint to roll back migrations, run migrations, and seed the database
app.post("/api/reset-database", async (req, res) => {
  try {
    await knex.migrate.rollback(null, true);
    await knex.migrate.latest();
    await knex.seed.run();
    res.status(200).json({ message: "Database reset successfully" });
  } catch (error) {
    console.error("Error resetting database:", error);
    res.status(500).json({ error: "Error resetting database" });
  }
});

// CABINS
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

app.put("/api/settings", async (req, res) => {
  const updates = req.body;
  console.log("Updating settings with:", req.body);

  try {
    const updated = await knex("settings").update(updates).where("id", 1);

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

// BOOKINGS
app.get("/api/bookings", async (req, res) => {
  const {
    status,
    sortBy,
    sortDirection,
    page,
    afterDate,
    startDateAfter,
    todayActivity,
  } = req.query;

  console.log("Received startDateAfter:", startDateAfter);

  try {
    let query = knex("bookings")
      .select(
        "bookings.*",
        "cabins.name as cabinName",
        "guests.fullName",
        "guests.email",
        "bookings.status"
      )
      .join("cabins", "bookings.cabinID", "cabins.id")
      .join("guests", "bookings.guestID", "guests.id");

    if (status) {
      query = query.where("bookings.status", status);
    }

    if (afterDate) {
      query = query.where(
        "bookings.created_at",
        ">=",
        moment(afterDate).format("YYYY-MM-DD HH:mm:ss")
      );
    }

    if (startDateAfter) {
      query = query.where(
        "bookings.startDate",
        ">=",
        moment(startDateAfter, "ddd, MMM DD YYYY").format("YYYY-MM-DD")
      );
    }

    if (todayActivity) {
      const today = moment().format("YYYY-MM-DD");
      query = query.where((builder) =>
        builder
          .where((builder) =>
            builder.where("status", "unconfirmed").andWhere("startDate", today)
          )
          .orWhere((builder) =>
            builder.where("status", "checked-in").andWhere("endDate", today)
          )
      );
    }

    if (sortBy && sortDirection) {
      query = query.orderBy(sortBy, sortDirection);
    }

    if (page) {
      const offset = (page - 1) * PAGE_SIZE;
      query = query.limit(PAGE_SIZE).offset(offset);
    }

    const bookings = await query;
    const totalCount = await knex("bookings").count("id as count").first();

    res.json({ bookings, totalCount: totalCount.count });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Database error occurred", details: error.message });
  }
});

app.get("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await knex("bookings")
      .select(
        "bookings.*",
        "cabins.name as cabinName",
        "guests.fullName",
        "guests.email"
      )
      .join("cabins", "bookings.cabinID", "cabins.id")
      .join("guests", "bookings.guestID", "guests.id")
      .where("bookings.id", id)
      .first();

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Database error occurred", details: error.message });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBooking = req.body;

  try {
    const updateResult = await knex("bookings")
      .where({ id })
      .update(updatedBooking);

    if (updateResult === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = await knex("bookings")
      .select(
        "bookings.*",
        "cabins.name as cabinName",
        "guests.fullName",
        "guests.email"
      )
      .join("cabins", "bookings.cabinID", "cabins.id")
      .join("guests", "bookings.guestID", "guests.id")
      .where("bookings.id", id)
      .first();

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteResult = await knex("bookings").where({ id }).del();

    if (deleteResult === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: `Booking ${id} successfully deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.delete("/api/bookings", async (req, res) => {
  try {
    // Delete all bookings from the database
    await knex("bookings").del();
    res.status(200).json({ message: "Bookings successfully deleted" });
  } catch (error) {
    console.error("Error deleting bookings:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.post("/api/bookings", async (req, res) => {
  const newBookings = req.body;

  try {
    // Insert new bookings into the database
    await knex("bookings").insert(newBookings);
    res.status(201).json({ message: "Bookings successfully created" });
  } catch (error) {
    console.error("Error creating bookings:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

// Test Database Connection
app.get("/api/test-db", async (req, res) => {
  try {
    await knex.raw("SELECT 1");
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection failed:", error);
    res
      .status(500)
      .json({ error: "Database connection failed", details: error.message });
  }
});

// Catch-all handler to serve the index.html file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
