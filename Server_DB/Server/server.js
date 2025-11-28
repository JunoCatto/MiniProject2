const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./dbConnection");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routing
const routes = require("../routes");
app.use("/api", routes);

// Landing page
app.use("/", (req, res) => {
  res.send({ message: "Welcome to OSRS API" });
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
