import { MindriftTask } from "@/lib/brain-dump/types";
import { CalendarCheck, ChevronDown, ChevronUp, Pause, Play, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import RiskStyles from "./RiskStyles";

export default function GeneratedTasks({
  tasks,
  expandedTaskId,
  setExpandedTaskId,
  onStart,
  onReschedule,
}: {
  tasks: MindriftTask[];
  expandedTaskId: string | null;
  setExpandedTaskId: (id: string | null) => void;
  onStart: (id: string) => void;
  onReschedule: (id: string) => void;
}) {
  return (
    <section className="rounded-4xl border border-white/10 bg-white/3 p-6 py-8 backdrop-blur-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl! font-semibold! text-white">
            Tasks Mindrift created
          </h2>
          <p className="mt-2 text-sm text-zinc-300">
            Each task has actions, tiny steps, and progress states.
          </p>
        </div>

        <CalendarCheck className="text-cyan-300" size={28} />
      </div>

      <div className="mt-6 space-y-3">
        {tasks.map((task, index) => {
          const isOpen = expandedTaskId === task.id;

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-white/10 bg-(--bg-900)/40 p-4"
            >
              <button
                onClick={() => setExpandedTaskId(isOpen ? null : task.id)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="font-medium text-white">{task.title}</div>
                    <StatusBadge status={task.status} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/6 px-3 py-1 text-zinc-400">
                      {task.category}
                    </span>
                    <span className="rounded-full bg-white/6 px-3 py-1 text-zinc-400">
                      {task.estimatedMinutes} min
                    </span>
                    <span className="rounded-full bg-white/6 px-3 py-1 text-zinc-400">
                      {task.difficulty} energy
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 ${RiskStyles(
                        task.urgency,
                      )}`}
                    >
                      {task.urgency} urgency
                    </span>
                  </div>
                </div>

                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/2.5 p-4">
                      <p className="text-sm leading-6 text-zinc-300">
                        {task.reason}
                      </p>

                      <div className="mt-4 space-y-2">
                        {task.tinySteps.map((step, idx) => (
                          <div
                            key={step}
                            className="flex items-center gap-3 text-sm text-zinc-300"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/6 text-xs text-zinc-400">
                              {idx + 1}
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <button
                          onClick={() => onStart(task.id)}
                          className="flex items-center h-fit justify-center gap-2 rounded-2xl bg-white p-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                        >
                          Start focus
                          <Play size={15} />
                        </button>

                        <button
                          onClick={() => onReschedule(task.id)}
                          className="flex items-center h-fit justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 p-3 text-sm text-zinc-300 transition hover:bg-white/6"
                        >
                          Move later
                          <RotateCcw size={15} />
                        </button>

                        <button
                          onClick={() => setExpandedTaskId(null)}
                          className="flex items-center h-fit justify-center gap-2 rounded-2xl border border-white/10 p-3 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                          Keep parked
                          <Pause size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}