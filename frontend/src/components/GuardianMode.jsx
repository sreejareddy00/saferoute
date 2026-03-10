import { useState, useEffect, useRef } from "react";
import API from "../api";

function GuardianMode({ userId, start }) {
  const [isOn, setIsOn] = useState(false);
  const intervalRef = useRef(null);
  //  const [guardian, setGuardian] = useState(null);

  // Start Guardian Mode
  const startGuardian = async () => {
    // const settingsRes = await API.post("/settings/get", { userId });
    // setGuardian(settingsRes.data);

     if (!userId) {
      alert("Please login first");
      return;
     }
    if (!start) return alert("Select a starting location on the map first");

    try {
      await API.post("/guardian/start", {
        userId,
        startLocation: { lat: start[0], lng: start[1] },
      });
    

      // Start sending location every 5 seconds
      intervalRef.current = setInterval(async () => {
        try {
          const res = await API.post("/guardian/update-location", {
            userId,
            lat: start[0],  // later this can be live GPS
            lng: start[1],
          });

          if (res.data.alert) {
            alert(res.data.alert);
          }
        } catch (err) {
          console.error("Tracking error:", err);
        }
      }, 5000);

    } catch (err) {
      console.error("Guardian start failed:", err);
    }
  };

  // Stop Guardian Mode
  const stopGuardian = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Toggle button logic
  useEffect(() => {
    if (isOn) {
      startGuardian();
    } else {
      stopGuardian();
    }

    return () => stopGuardian(); // cleanup if component unmounts
  }, [isOn]);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4">
      <button
        onClick={() => setIsOn(!isOn)}
        className={`w-full p-3 rounded-xl font-semibold transition ${
          isOn
            ? "bg-gradient-to-r from-emerald-500 to-green-600"
            : "bg-gray-500"
        }`}
      >
        {isOn ? "Guardian Mode ON 🛡️" : "Activate Guardian Mode"}
      </button>
    </div>
  );
}

export default GuardianMode;
