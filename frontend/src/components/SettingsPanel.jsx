import { useState } from "react";
import API from "../api";

function SettingsPanel({ isOpen, onClose }) {

  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSave = async () => {
    if (!guardianName || !guardianPhone) {
      alert("Please fill guardian details");
      return;
    }

    try {
      await API.post("/settings/save", {
        userId,
        guardianName,
        guardianPhone,
      });

      alert("Guardian info saved");
      onClose();
    } catch {
      alert("Failed to save settings");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white/10 backdrop-blur-xl border-l border-white/20 p-5 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Settings</h2>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="space-y-3">
        <input
          value={guardianName}
          onChange={(e) => setGuardianName(e.target.value)}
          className="w-full bg-white/20 p-2 rounded text-white"
          placeholder="Guardian Name"
        />
        <input
          value={guardianPhone}
          onChange={(e) => setGuardianPhone(e.target.value)}
          className="w-full bg-white/20 p-2 rounded text-white"
          placeholder="Guardian Phone"
        />
        <button
          onClick={handleSave}
          className="w-full bg-indigo-500 p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;
