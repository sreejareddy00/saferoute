function SafetyResult({ scoreData }) {
  if (!scoreData) return null;

  const { safetyScore, riskLevel } = scoreData;

  let color = "text-green-400";
  if (riskLevel === "Medium") color = "text-yellow-400";
  if (riskLevel === "High") color = "text-red-400";

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Route Safety</h2>
      <p className="text-2xl font-bold">Score: {safetyScore}/100</p>
      <p className={`font-semibold ${color}`}>Risk Level: {riskLevel}</p>
    </div>
  );
}

export default SafetyResult;
