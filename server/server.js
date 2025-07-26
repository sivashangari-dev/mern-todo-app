const express = require("express");
const cors = require("cors");

// Loads environment variables from a .env file (port numbers, db credentiaals)
require("dotenv").config();

// create an instance of express called app
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());

const router = require("./routes");

//use /api to prefix our endpoints
app.use("/api", router);

const connectDatabase = require("./dbConnection");

// connectDatabase();

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDatabase();

  // Starts the Express server on the specified port . logs the message so that we will know
  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
};

startServer();
