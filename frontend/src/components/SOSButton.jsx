function SOSButton() {
  const handleSOS = () => {
  alert("Emergency alert sent to guardians!");
};

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4">
      <button onClick={handleSOS} className="w-full bg-gradient-to-r from-rose-500 to-red-600 p-4 rounded-xl text-lg font-bold shadow-md hover:scale-105 transition">
        🚨 SOS
      </button>
    </div>
  );
}

export default SOSButton;
