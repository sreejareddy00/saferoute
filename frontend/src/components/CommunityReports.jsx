import { useState } from "react";
import API from "../api";

function CommunityReports({ currentLocation })
{
  const [showForm, setShowForm] = useState(false);
    const [issueType, setIssueType] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async () => {
  if (!currentLocation) {
    alert("Select a location on the map first");
    return;
  }

  if (!issueType || !severity) {
    alert("Please fill required fields");
    return;
  }

  try {
    await API.post("/incidents/report", {
      issueType,
      severity: severity === "Low" ? 1 : severity === "Medium" ? 2 : 3,
      description,
      location: { lat: currentLocation[0], lng: currentLocation[1] },
      areaName: "User Reported Area",
    });

    alert("Report submitted successfully!");
    setIssueType("");
    setSeverity("");
    setDescription("");
    setShowForm(false);

  } catch (err) {
    console.error(err);
    alert("Failed to submit report");
  }
};

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Community Alerts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 px-3 py-1 rounded-lg text-sm hover:bg-indigo-600 transition"
        >
          {showForm ? "Close" : "Report"}
        </button>
      </div>

      {/* Existing Alerts (dummy for now) */}
      <div className="space-y-2 text-sm text-gray-300">
        <div className="bg-white/5 p-2 rounded-lg">⚠ Poor street lighting reported nearby</div>
        <div className="bg-white/5 p-2 rounded-lg">🚨 Harassment incident reported 30 mins ago</div>
      </div>

      {/* Report Form */}
      {/* Report Form */}
{showForm && (
  <div className="bg-white/5 p-3 rounded-xl space-y-3">

    <select
      value={issueType}
      onChange={(e) => setIssueType(e.target.value)}
      className="w-full bg-white/20 p-2 rounded text-black"
    >
      <option value="">Select Issue Type</option>
      <option>Harassment</option>
      <option>Stalking</option>
      <option>No Street Lights</option>
      <option>Stray Dogs</option>
      <option>Suspicious Activity</option>
    </select>

    <select
      value={severity}
      onChange={(e) => setSeverity(e.target.value)}
      className="w-full bg-white/20 p-2 rounded text-black"
    >
      <option value="">Severity</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full bg-white/20 p-2 rounded text-white placeholder-gray-300"
      placeholder="Optional description..."
    />

    <button
      onClick={handleSubmit}
      className="w-full bg-rose-500 p-2 rounded-lg hover:bg-rose-600 transition"
    >
      Submit Report
    </button>

  </div>
  )}
    </div>
  );
}

export default CommunityReports;
