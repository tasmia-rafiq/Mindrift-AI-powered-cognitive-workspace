import { PlannerBlock } from "@/lib/brain-dump/types";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";

export default function AdaptivePlanner({
  planner,
  progress,
}: {
  planner: PlannerBlock[];
  progress: number;
}) {
  return (
    <section className="rounded-4xl border border-white/10 bg-white/3 p-6 py-8 backdrop-blur-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl! font-semibold! text-white">
            Adaptive plan for today
          </h2>
          <p className="mt-2 text-sm text-zinc-300">
            Updates as you complete, pause, or move tasks.
          </p>
        </div>

        <Sparkles className="text-violet-300" size={28} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-300">Pressure relief</span>
          <span className="text-cyan-300">{progress}%</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full bg-linear-to-r from-cyan-300 to-violet-400"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {planner.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative rounded-3xl border border-white/10 bg-black/20 p-5"
          >
            <div className="absolute left-0 top-6 h-10 w-0.75 rounded-full bg-linear-to-b from-cyan-300 to-violet-400" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-cyan-300">{block.time}</div>
                <h3 className="mt-1 font-medium text-white">{block.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {block.note}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-400">
                  {block.energy} energy
                </span>
                <StatusBadge status={block.status} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}