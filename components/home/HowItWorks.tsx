"use client";

import { motion } from "framer-motion";
import {
  FileText,
  BrainCircuit,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Dump Everything",
    description:
      "Write naturally without structure. Thoughts, stress, reminders, emotions — Mindrift captures all cognitive noise instantly.",
    icon: FileText,
  },
  {
    title: "AI Understands Context",
    description:
      "Adaptive intelligence detects urgency, emotional patterns, tasks, priorities, and mental overload automatically.",
    icon: BrainCircuit,
  },
  {
    title: "Regain Mental Clarity",
    description:
      "Receive structured focus, calm guidance, intelligent planning, and actionable next steps tailored to your state.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden py-32 px-6"
    >
      {/* ambient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-100 w-100 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
            <Sparkles size={15} className="text-cyan-400" />
            How Mindrift Works
          </div>

          <h2 className="mt-6 text-5xl font-black tracking-[-0.04em] leading-tight">
            From mental chaos
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-violet-400">
              to cognitive clarity.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl">
            Mindrift transforms overwhelming thoughts into structured clarity
            using adaptive AI cognition and behavioral intelligence.
          </p>
        </div>

        {/* steps */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="relative"
              >
                {/* step number */}
                <div className="absolute -top-5 left-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-black text-sm font-semibold text-cyan-300">
                  0{index + 1}
                </div>

                <div className="group relative h-full overflow-hidden rounded-4xl border border-white/10 bg-white/3 backdrop-blur-2xl p-8">
                  {/* hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-[80px]" />
                  </div>

                  {/* content */}
                  <div className="relative z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                      <Icon
                        className="text-cyan-300"
                        size={30}
                      />
                    </div>

                    <h3 className="mt-10 text-2xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-5 leading-7 text-zinc-400">
                      {step.description}
                    </p>

                    {/* bottom visual */}
                    <div className="mt-10 flex items-center justify-between">
                      <div className="h-2 flex-1 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-cyan-300 to-violet-400"
                          style={{
                            width: `${(index + 1) * 33}%`,
                          }}
                        />
                      </div>

                      {index !== 2 && (
                        <ArrowRight
                          className="ml-4 text-zinc-600"
                          size={18}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}