const VerifiedIncident = require("../models/VerifiedIncident");
const CommunityReport = require("../models/CommunityReport");

// simple distance calculator
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // km
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

const calculateSafetyScore = async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng } = req.body;

    let score = 100;

    // midpoint of route
    const midLat = (startLat + endLat) / 2;
    const midLng = (startLng + endLng) / 2;

    const verifiedIncidents = await VerifiedIncident.find();
    const communityReports = await CommunityReport.find();

    // Check verified incidents (big impact)
// Verified incidents (major impact)
verifiedIncidents.forEach((incident) => {
  if (!incident.location) return;

  const iLat = Number(incident.location.lat);
  const iLng = Number(incident.location.lng);
  const sev = Number(incident.severity);

  if (isNaN(iLat) || isNaN(iLng) || isNaN(sev)) return;

  const dist = getDistance(midLat, midLng, iLat, iLng);

  if (dist < 0.5) {
    score -= sev * 8;
  } else if (dist < 1) {
    score -= sev * 4;
  } else if (dist < 2) {
    score -= sev * 1;
  }
});

    // Check community reports (smaller impact)
    // Community reports (smaller impact)
communityReports.forEach((report) => {
  if (!report.location) return;

  const rLat = Number(report.location.lat);
  const rLng = Number(report.location.lng);
  const sev = Number(report.severity);

  if (isNaN(rLat) || isNaN(rLng) || isNaN(sev)) return;

  const dist = getDistance(midLat, midLng, rLat, rLng);

  if (dist < 0.5) {
    score -= sev * 3;
  } else if (dist < 1) {
    score -= sev * 1;
  }
});


    if (score < 0) score = 0;

    let riskLevel = "Low";
    if (score < 20) riskLevel = "High";
    else if (score < 35) riskLevel = "Medium";

    res.json({
      safetyScore: score,
      riskLevel,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate score" });
  }
};

module.exports = { calculateSafetyScore };
