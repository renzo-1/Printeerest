// only require dotenv if development stage
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const corsOptions = require("./configs/corsOptions");
const sessionConfig = require("./configs/session");
const ExpressError = require("./utils/ExpressErrors");
const User = require("./models/userModel");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connection Open");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors(corsOptions));
app.use(session(sessionConfig));
app.use(methodOverride("_method"));

// HTML path config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// request data encoder
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
app.use("/api/orders", require("./routes/order"));
app.use("/api/deliveryAddress", require("./routes/deliveryAddress"));
app.use("/api", require("./routes/user"));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  console.log(err);
  res.status(statusCode).json({ message: `${err}` });
});

app.listen(port, () =>
  console.log(`Server is up and running on port ${port}...`)
);
