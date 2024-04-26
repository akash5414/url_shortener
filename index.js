const dotenv = require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

const { connectToMongoDB } = require("./connect");

const Url = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly , checkAuth } = require("./middlewares/auth")

connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error :" + err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use("/url", checkAuth, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);


app.listen(process.env.PORT, () =>
  console.log(`listening on port: ${process.env.PORT}`)
);
