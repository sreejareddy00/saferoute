import API from "../api";


 function RouteForm({ start, end, setScoreData }){ 
 
  const handleCheckSafety = async () => {
    if (!start || !end) return alert("Select both points");

    try {
      const res = await API.post("/routes/score", {
        startLat: start[0],
        startLng: start[1],
        endLat: end[0],
        endLng: end[1],
      });
      console.log("API RESPONSE:", res.data);
    // setSafetyScore(res.data.safetyScore);
    setScoreData(res.data);


    } catch (error) {
      console.error("Error fetching safety score:", error);
      alert("Failed to get safety score");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4 space-y-3">
      <h2 className="font-semibold text-lg">Enter Route</h2>

      <input
        className="w-full bg-white/20 p-2 rounded text-white placeholder-gray-300"
        value={start ? `${start[0].toFixed(4)}, ${start[1].toFixed(4)}` : ""}
        placeholder="Start Location (click map)"
        readOnly
      />

      <input
        className="w-full bg-white/20 p-2 rounded text-white placeholder-gray-300"
        value={end ? `${end[0].toFixed(4)}, ${end[1].toFixed(4)}` : ""}
        placeholder="Destination (click map)"
        readOnly
      />

      <button
        onClick={handleCheckSafety}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Check Safety
      </button>
    </div>
  );
}

export default RouteForm;
