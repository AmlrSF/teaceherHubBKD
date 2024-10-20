// dbConnection.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb+srv://amirsouaf1212:amirsouaf1212@cluster0.0unfs.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB database");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
