const express = require("express");
const router = express.Router();
const { calculateSafetyScore } = require("../controllers/routeController");

router.post("/score", calculateSafetyScore);

module.exports = router;
