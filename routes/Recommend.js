const express = require("express");
const { Recommendations } = require("../controllers/auth/getUser");
const router = express.Router();

router.post("/recommend", Recommendations);

module.exports = router;
