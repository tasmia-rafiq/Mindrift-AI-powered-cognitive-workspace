type Task = {
  id: string;
  title: string;
  status: string;
  urgency: string;
  difficulty: string;
  category: string | null;
};

export default function TodayPriorities({ tasks }: { tasks: Task[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-6">
      <h2 className="text-3xl! font-medium">Today’s Priorities</h2>

      {tasks.length === 0 ? (
        <p className="mt-4 text-zinc-500">
          No tasks yet. Create a Mind Unload to generate your plan.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-white/10 bg-white/4 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-white">{task.title}</div>
                  <div className="mt-2 text-sm text-zinc-500">
                    {task.category ?? "General"}
                  </div>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                  {task.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-zinc-400">
                  {task.urgency} urgency
                </span>
                <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-zinc-400">
                  {task.difficulty} energy
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}