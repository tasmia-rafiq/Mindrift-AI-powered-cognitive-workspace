import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function ThinkingPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="rounded-4xl border border-white/10 bg-white/3 p-8 text-center backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-cyan-400/20 bg-cyan-400/10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <BrainCircuit size={36} className="text-cyan-300" />
        </motion.div>
      </div>

      <h3 className="mt-6 text-2xl font-medium text-white">
        Mindrift is building your guided flow...
      </h3>

      <p className="mx-auto mt-3 max-w-xl text-zinc-500">
        Sorting thoughts, creating tasks, building a softer plan, and choosing
        the easiest first step.
      </p>
    </motion.section>
  );
}