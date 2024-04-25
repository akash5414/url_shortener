const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const Url = require("./models/url");
const dotenv = require("dotenv").config();
const app = express();
const path = require("path");
const staticRoute = require('./routes/staticRouter');

connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error :" + err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/url", urlRoute);
app.use("/", staticRoute);


app.listen(process.env.PORT, () =>
  console.log(`listening on port: ${process.env.PORT}`)
);
