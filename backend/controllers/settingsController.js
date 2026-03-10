const UserSettings = require("../models/UserSettings");

const saveSettings = async (req, res) => {
  try {
    const { userId, guardianName, guardianPhone } = req.body;

    const settings = await UserSettings.findOneAndUpdate(
      { userId },
      { guardianName, guardianPhone },
      { upsert: true, new: true }
    );

    res.json({ message: "Settings saved", settings });
  } catch (error) {
    res.status(500).json({ error: "Failed to save settings" });
  }
};

module.exports = { saveSettings };
