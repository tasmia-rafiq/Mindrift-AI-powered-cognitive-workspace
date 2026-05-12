export default function AIRecommendations() {
  const insights = [
    "You are switching tasks too frequently.",
    "Morning hours show highest cognitive clarity.",
    "Break large tasks into 30-45 min blocks.",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 px-6 py-8">
      <h2 className="text-3xl! font-medium">
        AI Insights
      </h2>

      <div className="mt-5 space-y-3">
        {insights.map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/2 border border-white/10 text-sm text-zinc-300"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}