const mongoose = require("mongoose");

const communityReportSchema = new mongoose.Schema({
  issueType: {
    type: String,
    required: true,
  },
  severity: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
  description: {
    type: String,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  areaName: {
    type: String,
  },
});

module.exports = mongoose.model("CommunityReport", communityReportSchema);
