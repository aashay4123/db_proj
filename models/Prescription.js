const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    insulin: {
      type: String,
    },
    glucose: {
      type: String,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    diabetes: String,
    bmi: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Prescription", userSchema);
