import { useState } from "react";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import RouteForm from "../components/RouteForm";
import SafetyResult from "../components/SafetyResult";
import SOSButton from "../components/SOSButton";
import GuardianMode from "../components/GuardianMode";
import CommunityReports from "../components/CommunityReports";
import SettingsPanel from "../components/SettingsPanel";



function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
const [scoreData, setScoreData] = useState(null);

  
  const userId = localStorage.getItem("userId");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <div className="p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-3">
         <MapView
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
            />

        </div>

        <div className="space-y-5">
        <RouteForm start={start} end={end} setScoreData={setScoreData} />

       <SafetyResult scoreData={scoreData} />
         <button
            onClick={() => alert("Journey ended. You are marked safe.")}
            className="w-full bg-green-600 p-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Reached Safely ✅
          </button>

          <SOSButton />
         <GuardianMode userId={userId} start={start} />

          <CommunityReports currentLocation={start} />

        </div>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default Home;
