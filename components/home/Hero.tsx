"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BrainCircuit } from "lucide-react";
import NavBar from "../NavBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      <NavBar />

      {/* Ambient Background */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-20%] left-[-10%] h-125 w-125 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-112.5 w-112.5 rounded-full bg-violet-500/10 blur-[140px]" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-linear(rgba(255,255,255,0.07) 1px, transparent 1px), linear-linear(to right, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[radial-linear(circle_at_center,transparent,black)] opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 lg:pt-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
              <Sparkles size={15} className="text-cyan-400" />
              AI-powered cognitive clarity system
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em]">
              Your second
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-white to-violet-400">
                AI brain.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Mindrift helps overwhelmed minds organize thoughts, reduce mental
              clutter, and regain deep focus with adaptive AI guidance.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black px-7 py-4 font-semibold hover:scale-[1.02] transition-all duration-300">
                Start Free
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl px-7 py-4 font-medium text-zinc-200 hover:bg-white/5 transition">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 flex items-center gap-10">
              <div>
                <div className="text-3xl font-bold text-white">92%</div>
                <div className="text-sm text-zinc-500 mt-1">
                  Reduced cognitive overload
                </div>
              </div>

              <div className="h-12 w-px bg-white/10" />

              <div>
                <div className="text-3xl font-bold text-white">3.4x</div>
                <div className="text-sm text-zinc-500 mt-1">
                  Better focus sessions
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-[200px]" />

            {/* Main Dashboard */}
            <div className="relative rounded-4xl border border-white/10 bg-white/4 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,255,255,0.08)]">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>

                <div className="text-sm text-zinc-500">
                  Mindrift Intelligence
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* AI Card */}
                <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/4 p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                      <BrainCircuit className="text-cyan-300" size={22} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Cognitive Analysis
                      </div>
                      <div className="text-sm text-zinc-500">
                        Stress levels decreasing
                      </div>
                    </div>
                  </div>

                  {/* fake chart */}
                  <div className="mt-6 h-28 rounded-xl bg-linear-to-b from-cyan-400/10 to-transparent relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-300/40" />

                    <svg
                      viewBox="0 0 500 120"
                      className="absolute inset-0 h-full w-full"
                    >
                      <path
                        d="M0 90 C60 70, 120 100, 180 80 C240 60, 280 70, 340 50 C390 35, 450 40, 500 10"
                        fill="none"
                        stroke="rgba(103,232,249,0.9)"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Lower Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/5 bg-white/3 p-5">
                    <div className="text-zinc-500 text-sm">
                      Focus Session
                    </div>

                    <div className="mt-3 text-3xl font-bold text-white">
                      48m
                    </div>

                    <div className="mt-2 text-xs text-cyan-300">
                      +18% this week
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/3 p-5">
                    <div className="text-zinc-500 text-sm">
                      Mental Clarity
                    </div>

                    <div className="mt-3 text-3xl font-bold text-white">
                      High
                    </div>

                    <div className="mt-2 text-xs text-violet-300">
                      AI optimized
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI Notification */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -bottom-10 -left-8 hidden md:block rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl px-5 py-4 shadow-2xl"
            >
              <div className="text-sm text-zinc-400">
                AI Recommendation
              </div>

              <div className="mt-1 text-white font-medium">
                Your focus improves after 9 PM.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}