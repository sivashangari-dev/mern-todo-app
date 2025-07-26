require("dotenv").config;

const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(`Database connected: ${connect.connection.name}`);
  } catch (error) {
    console.error("Database Connection Failed");
  }
};

module.exports = connectDatabase;
