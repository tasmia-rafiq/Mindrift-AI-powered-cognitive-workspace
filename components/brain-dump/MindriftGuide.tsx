import { motion } from "framer-motion";
import { Bot, CheckCircle2 } from "lucide-react";
import Image from "next/image";

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
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"
        >
          <Image src="/miro.png" alt="Miro Assistant" width={40} height={40} />
        </motion.div>

        <div>
          <div className="font-medium text-white">
            Miro, your Mindrift guide
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