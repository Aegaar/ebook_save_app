require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/books", booksRoutes);
app.use('/api/user', userRoutes)

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to database and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
