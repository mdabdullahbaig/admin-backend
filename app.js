const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const HttpError = require("./models/httpError");


const app = express();

const PORT = process.env.PORT || 3000;

//It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    const error = new HttpError("Something went wrong.", 500);
    next(error);
  });
  
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Something went wrong." });
  });


mongoose
  .connect("mongodb://localhost:27017/ecommercedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("ecommercedb database has been connected.");
    app.listen(PORT);
    console.log(`Server is running on ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
