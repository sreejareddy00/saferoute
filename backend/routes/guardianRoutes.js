const express = require("express");
const router = express.Router();
const {
  startGuardianSession,
  updateLocation,
} = require("../controllers/guardianController");

router.post("/start", startGuardianSession);
router.post("/update-location", updateLocation);

module.exports = router;
