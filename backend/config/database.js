require('dotenv').config();  // Load environment variables

const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log("There is an issue in connecting to the DB:", err);
  }
};

module.exports = dbConnection;
