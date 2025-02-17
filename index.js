// Bring in Packages installed
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth")

// Initalize express app
const app = express();

// Configure middlewares/cors
app.use(cors());

//Ensure that express can read json files
app.use(express.json());

//route
app.use("/api/auth", authRoutes );

// Mongodb connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("Mongodb error:", error);
  });

//Start node js server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
