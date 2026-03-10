const mongoose = require("mongoose");

const guardianSessionSchema = new mongoose.Schema({
userId: {
  type: String,
  required: true,
},
  isActive: {
    type: Boolean,
    default: true,
  },
  startLocation: {
    lat: Number,
    lng: Number,
  },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GuardianSession", guardianSessionSchema);
