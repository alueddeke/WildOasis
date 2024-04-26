const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
