const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyparser = require("body-parser");
require("dotenv").config();
const path = require("path");
const { passportInit } = require("./controllers/auth/getUser");
const authRoute = require("./routes/auth");
const recRoute = require("./routes/Recommend");
const prescriptionRoute = require("./routes/prescription");

const app = express();

const mongo_url = process.env.MONGO_URL;
app.use(
  cors({
    credentials: true,
    origin: [process.env.REACT_APP_BASE_URL],
  }),
);
mongoose
  .connect(mongo_url)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;
app.use(passport.initialize());
passportInit(passport);
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);
app.use("/api", authRoute);
app.use("/api/pres", recRoute);
app.use("/api/prescription", prescriptionRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Api is running on port ${port} - ${process.env.NODE_ENV}`);
});
