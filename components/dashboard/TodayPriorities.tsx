export default function TodayPriorities() {
  const tasks = [
    "Complete urgent client task",
    "Review system design notes",
    "Personal admin work",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 px-6 py-8">
      <h2 className="text-3xl! font-medium">
        Today's Priorities
      </h2>

      <div className="mt-6 space-y-3">
        {tasks.map((t, i) => (
          <div
            key={t}
            className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/2"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-sm text-zinc-300">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}