const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    insulin: {
      type: Number,
      required: true,
    },
    glucose: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      type: Number,
      required: true,
    },
    diabetes: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Prescription", userSchema);
