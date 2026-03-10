const mongoose = require("mongoose");

const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  guardianName: String,
  guardianPhone: String,
});

module.exports = mongoose.model("UserSettings", userSettingsSchema);
