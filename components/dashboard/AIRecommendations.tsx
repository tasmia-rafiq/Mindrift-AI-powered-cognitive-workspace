export default function AIRecommendations({ items }: { items: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-6">
      <h2 className="text-3xl! font-medium">AI Recommendations</h2>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/4 p-4 text-sm text-zinc-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}