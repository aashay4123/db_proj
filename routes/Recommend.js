const express = require("express");
const {
  Recommendations,
  updatePrescription,
} = require("../controllers/auth/getUser");
const router = express.Router();

router.post("/recommend", Recommendations);
router.post("/:id", updatePrescription);

module.exports = router;
