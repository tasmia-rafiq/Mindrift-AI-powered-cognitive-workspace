"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      {/* ambient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-white/4 backdrop-blur-2xl"
      >
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-400/4 via-transparent to-violet-400/5" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 px-8 py-24 md:px-20 text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300">
            <Sparkles
              size={15}
              className="text-cyan-400"
            />
            Cognitive Clarity Starts Here
          </div>

          {/* heading */}
          <h2 className="mx-auto mt-8 max-w-4xl text-5xl md:text-6xl font-black tracking-[-0.04em] leading-none text-white">
            Stop drowning in
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-white to-violet-400">
              mental overload.
            </span>
          </h2>

          {/* subtext */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Mindrift helps you organize chaotic thoughts, regain focus,
            reduce burnout, and think clearly with adaptive AI support.
          </p>

          {/* actions */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.03]">
              Start Free

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button className="rounded-2xl border border-white/10 bg-white/3 px-8 py-4 font-medium text-zinc-300 backdrop-blur-xl transition hover:bg-white/5">
              Book Demo
            </button>
          </div>

          {/* bottom metrics */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-center">
            <div>
              <div className="text-3xl font-bold text-white">
                92%
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                Mental clarity improvement
              </div>
            </div>

            <div className="hidden h-12 w-px bg-white/10 md:block" />

            <div>
              <div className="text-3xl font-bold text-white">
                3.4x
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                Better focus sessions
              </div>
            </div>

            <div className="hidden h-12 w-px bg-white/10 md:block" />

            <div>
              <div className="text-3xl font-bold text-white">
                AI
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                Adaptive cognitive support
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}