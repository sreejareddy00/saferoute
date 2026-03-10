const CommunityReport = require("../models/CommunityReport");
const VerifiedIncident = require("../models/VerifiedIncident");

// 🔹 POST /api/incidents/report
const reportIncident = async (req, res) => {
  try {
    const { issueType, severity, description, location, areaName } = req.body;

    const newReport = new CommunityReport({
      issueType,
      severity,
      description,
      location,
      areaName,
    });

    await newReport.save();

    res.status(201).json({ message: "Community report submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit report" });
  }
};

// 🔹 GET /api/incidents/verified
const getVerifiedIncidents = async (req, res) => {
  try {
    const incidents = await VerifiedIncident.find();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch verified incidents" });
  }
};

module.exports = {
  reportIncident,
  getVerifiedIncidents,
};
