const express = require("express");
const router = express.Router();
const {
  reportIncident,
  getVerifiedIncidents,
} = require("../controllers/incidentController");

router.post("/report", reportIncident);
router.get("/verified", getVerifiedIncidents);

module.exports = router;
