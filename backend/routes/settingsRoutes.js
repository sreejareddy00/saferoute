const express = require("express");
const router = express.Router();
const { saveSettings } = require("../controllers/settingsController");

router.post("/save", saveSettings);

module.exports = router;
