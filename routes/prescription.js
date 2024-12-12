const express = require("express");
const { getOne, createOne, getAll } = require("../utils/handleFactory");
const Prescription = require("../models/prescription");
const router = express.Router();

router.post("/", createOne(Prescription));
router.get("/:id", getOne(Prescription));
router.get("/", getAll(Prescription));

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const prescription = await Prescription.findByIdAndDelete(id);
  res.status(200).json({ status: "success", data: prescription });
});

module.exports = router;
