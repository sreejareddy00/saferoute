const GuardianSession = require("../models/GuardianSession");

// distance helper (km)
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// 🔹 Start guardian mode
const startGuardianSession = async (req, res) => {
  try {
    const { userId, startLocation } = req.body;

    const session = new GuardianSession({
      userId,
      startLocation,
      currentLocation: startLocation,
    });

    await session.save();

    res.status(201).json({ message: "Guardian session started", session });
  } catch (error) {
  console.error("GUARDIAN START ERROR:", error);
  res.status(500).json({ error: error.message });
}

};

// 🔹 Update user live location with smart detection
const updateLocation = async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;

    const session = await GuardianSession.findOne({ userId, isActive: true });
    if (!session) {
      return res.status(404).json({ error: "No active session found" });
    }

    const prevLat = session.currentLocation.lat;
    const prevLng = session.currentLocation.lng;
    const lastTime = new Date(session.lastUpdated).getTime();
    const now = Date.now();

    const distanceMoved = getDistance(prevLat, prevLng, lat, lng);
    const minutesPassed = (now - lastTime) / (1000 * 60);

    let alert = null;

    // 🛑 Stationary detection
    if (distanceMoved < 0.02 && minutesPassed > 0.15) {
      alert = "User stationary for too long";
    }

    // 🧭 Sudden large movement
    if (distanceMoved > 0.3) {
      alert = "Unusual movement detected";
    }

    session.currentLocation = { lat, lng };
    session.lastUpdated = now;
    await session.save();

    res.json({
      message: "Location updated",
      alert,
    });

  } catch (error) {
    res.status(500).json({ error: "Location update failed" });
  }
};

module.exports = {
  startGuardianSession,
  updateLocation,
};
