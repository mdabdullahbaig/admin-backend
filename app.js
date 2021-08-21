const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const HttpError = require("./util/HttpError");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
const { databaseInfo } = require("./config/local");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware when site is down
// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down, Check back soon.");
// });

// This is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.use((req, res, next) => {
  const error = new HttpError("Something went wrong.", 500);
  return next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(databaseInfo.db_url, databaseInfo.db_callback)
  .then(() => {
    console.info("Database has been connected.");
    app.listen(PORT);
    console.log(`Server is running on ${PORT}`);
  })
  .catch((err) => {
    console.error(err);
  });
