import { motion } from "framer-motion";
import { Bot, CheckCircle2 } from "lucide-react";

export default function MindriftGuide() {
  const items = [
    "Finds what matters first",
    "Creates tasks automatically",
    "Builds today’s plan",
    "Starts the first step with you",
    "Adapts if you feel overwhelmed",
    "Tracks relief, not just productivity",
  ];

  return (
    <div className="rounded-[30px] border border-white/10 bg-black/25 p-6">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"
        >
          <Bot size={24} className="text-cyan-300" />
        </motion.div>

        <div>
          <div className="font-medium text-white">
            Miri, your Mindrift guide
          </div>
          <div className="text-sm text-zinc-500">
            I'll help you move gently.
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 text-sm text-zinc-300"
          >
            <CheckCircle2 size={17} className="text-cyan-300" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}