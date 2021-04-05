require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//connect db
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/getTodo"));

//error handler, should be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
