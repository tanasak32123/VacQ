const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const hospitals = require("./routes/hospitals");

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Mount routers
app.use("/api/v1/hospitals", hospitals);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    "Server is running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

//Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
