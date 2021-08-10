const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const HttpError = require("./util/HttpError");
const userRoute = require("./routes/user-route");

const app = express();

const PORT = process.env.PORT || 3000;

// This is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route middleware
app.use("/api/users", userRoute);

app.use((req, res, next) => {
  const error = new HttpError("Something went wrong.", 500);
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

// mongoose
//   .connect("mongodb://localhost:27017/ecommercedb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("ecommercedb database has been connected.");
//     app.listen(PORT);
//     console.log(`Server is running on ${PORT}`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
