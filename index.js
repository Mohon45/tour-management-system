const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const tourRoute = require("./routes/tour.route");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL_URI).then(() => {
  console.log("Database connection is successful");
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", tourRoute);

app.get("/", (req, res) => {
  res.send("Tour Management System server is Running!");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.all("*", (req, res) => {
  res.send("No Route Found.");
});
