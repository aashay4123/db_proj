const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();
const path = require("path");

const authRoute = require("./routes/auth");
const prescriptionRoute = require("./routes/prescription");

const app = express();

const mongo_url = process.env.MONGO_URL;

mongoose
  .connect(mongo_url)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/api", authRoute);
app.use("/api/prescription", prescriptionRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Api is running on port ${port} - ${process.env.NODE_ENV}`);
});
