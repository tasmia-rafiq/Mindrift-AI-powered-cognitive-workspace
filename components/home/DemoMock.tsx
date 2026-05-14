"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const aiOutput = {
  tasks: [
    "Submit tax form before Friday",
    "Prepare client meeting notes",
    "Buy groceries after work",
  ],
  emotions: [
    "High stress detected",
    "Cognitive overload increasing",
  ],
  recommendation:
    "Prioritize urgent tasks first and schedule a 20-minute decompression session tonight.",
};

export default function DemoMock() {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const runDemo = () => {
    setCompleted(false);
    setRunning(true);

    setTimeout(() => {
      setRunning(false);
      setCompleted(true);
    }, 2400);
  };

  return (
    <section
      id="demo"
      className="relative overflow-hidden py-32 px-6"
    >
      {/* ambient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 bottom-0 h-125 w-125 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
            <Sparkles size={15} className="text-cyan-400" />
            Live AI Experience
          </div>

          <h2 className="mt-6 text-5xl font-black tracking-[-0.04em] leading-tight">
            Watch your thoughts
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-violet-400">
              organize themselves.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl">
            Experience how Mindrift transforms mental overload into actionable
            clarity using adaptive AI cognition.
          </p>
        </div>

        {/* showcase */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* input panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 backdrop-blur-2xl p-8"
          >
            {/* glow */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-400/3 to-violet-400/3" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-zinc-500">
                    Cognitive Input
                  </div>

                  <div className="mt-1 text-xl font-semibold text-white">
                    Mind Unload Session
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                  <BrainCircuit
                    className="text-cyan-300"
                    size={24}
                  />
                </div>
              </div>

              {/* fake textarea */}
              <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
                <p className="leading-8 text-zinc-300">
                  I'm overwhelmed with deadlines lately. I still need to
                  prepare for tomorrow's client meeting, submit the tax form,
                  buy groceries, and I honestly feel mentally exhausted...
                </p>
              </div>

              {/* action */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                  AI Cognitive Engine Ready
                </div>

                <button
                  onClick={runDemo}
                  className="group flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
                >
                  Analyze
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* output panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 backdrop-blur-2xl p-8 min-h-125"
          >
            <div className="absolute inset-0 bg-linear-to-br from-violet-400/3 to-cyan-400/3" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-zinc-500">
                    AI Cognitive Analysis
                  </div>

                  <div className="mt-1 text-xl font-semibold text-white">
                    Structured Mental Clarity
                  </div>
                </div>

                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                  Neural Processing
                </div>
              </div>

              {/* loading */}
              {running && (
                <div className="mt-20 flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full border border-cyan-400/20" />

                    <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-cyan-300" />
                  </div>

                  <div className="mt-8 text-xl font-medium text-white">
                    Analyzing cognitive patterns...
                  </div>

                  <div className="mt-3 text-zinc-500">
                    Detecting stress, priorities, and mental overload
                  </div>
                </div>
              )}

              {/* completed */}
              {!running && completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-10 space-y-8"
                >
                  {/* tasks */}
                  <div>
                    <div className="text-sm uppercase tracking-wider text-zinc-500">
                      Priority Tasks
                    </div>

                    <div className="mt-5 space-y-3">
                      {aiOutput.tasks.map((task) => (
                        <div
                          key={task}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-4"
                        >
                          <CheckCircle2
                            className="text-cyan-300"
                            size={18}
                          />

                          <span className="text-zinc-300">
                            {task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* emotions */}
                  <div>
                    <div className="text-sm uppercase tracking-wider text-zinc-500">
                      Emotional Signals
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {aiOutput.emotions.map((emotion) => (
                        <div
                          key={emotion}
                          className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300"
                        >
                          {emotion}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* recommendation */}
                  <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/4 p-6">
                    <div className="text-sm text-cyan-300">
                      AI Recommendation
                    </div>

                    <p className="mt-3 leading-7 text-zinc-300">
                      {aiOutput.recommendation}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* idle state */}
              {!running && !completed && (
                <div className="mt-24 flex flex-col items-center justify-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/10 bg-white/3">
                    <BrainCircuit
                      className="text-cyan-300"
                      size={42}
                    />
                  </div>

                  <div className="mt-8 text-2xl font-semibold text-white">
                    AI analysis ready
                  </div>

                  <p className="mt-4 max-w-sm leading-7 text-zinc-500">
                    Start the cognitive analysis to watch Mindrift organize
                    overwhelming thoughts into calm structured clarity.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}