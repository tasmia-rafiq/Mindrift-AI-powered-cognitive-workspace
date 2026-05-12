"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  Radar,
  Clock3,
  PanelsTopLeft,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Brain Dump Intelligence",
    description:
      "Unload chaotic thoughts instantly. Mindrift organizes everything into structured clarity using adaptive AI cognition.",
    icon: BrainCircuit,
    size: "large",
  },
  {
    title: "Adaptive Planning",
    description:
      "Schedules dynamically shift based on your mental energy, habits, and stress levels.",
    icon: PanelsTopLeft,
    size: "small",
  },
  {
    title: "Burnout Prediction",
    description:
      "Detect mental fatigue before it spirals into burnout with behavioral pattern analysis.",
    icon: Radar,
    size: "small",
  },
  {
    title: "AI Reflection Mentor",
    description:
      "A calm AI companion that helps you process emotions, overthinking, and decisions clearly.",
    icon: Sparkles,
    size: "small",
  },
  {
    title: "Deep Focus Sessions",
    description:
      "Immersive AI-guided sessions engineered to reduce distraction and improve mental flow.",
    icon: Clock3,
    size: "small",
  },
  {
    title: "Second Brain Memory",
    description:
      "Instantly recall ideas, insights, thoughts, and moments using contextual AI memory.",
    icon: ShieldCheck,
    size: "small",
  },
];

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  const Icon = feature.icon;

  const sizeStyles = {
    large: "lg:col-span-2 lg:row-span-2 min-h-[420px]",
    wide: "lg:col-span-2 min-h-[260px]",
    small: "min-h-[260px]",
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{ duration: 0.3 }}
      className={`
        group
        relative
        overflow-hidden
        rounded-4xl
        border
        border-white/10
        bg-white/3
        backdrop-blur-2xl
        p-8
        ${sizeStyles[feature.size as keyof typeof sizeStyles]}
      `}
    >
      {/* glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-400/10 blur-[80px]" />
      </div>

      {/* grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* icon */}
        <div className="flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Icon className="text-cyan-300" size={26} />
          </div>

          <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-400">
            AI Powered
          </div>
        </div>

        {/* content */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {feature.title}
          </h3>

          <p className="mt-4 max-w-md text-zinc-400 leading-7">
            {feature.description}
          </p>
        </div>

        {/* visual preview */}
        <div className="mt-auto pt-10">
          {feature.size === "large" && (
            <div className="mt-10">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-300" />
                  <span className="text-sm text-zinc-400">
                    AI organizing thoughts...
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="h-3 rounded-full bg-white/10 w-[90%]" />
                  <div className="h-3 rounded-full bg-cyan-400/20 w-[75%]" />
                  <div className="h-3 rounded-full bg-white/10 w-[60%]" />
                </div>

                <div className="mt-6 flex gap-2 flex-wrap">
                  <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    Stress
                  </div>

                  <div className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
                    Planning
                  </div>

                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
                    Reflection
                  </div>
                </div>
              </div>
            </div>
          )}

          {feature.size === "small" && (
            <div className="flex gap-3">
              <div className="h-16 flex-1 rounded-2xl border border-white/10 bg-white/3" />
              <div className="h-16 w-16 rounded-2xl border border-cyan-400/20 bg-cyan-400/10" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* ambient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-100 w-100 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
            <Sparkles size={15} className="text-cyan-400" />
            Cognitive Intelligence Features
          </div>

          <h2 className="mt-6 text-5xl font-black tracking-[-0.04em] leading-tight text-white">
            Built for
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-violet-400">
              overwhelmed minds.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl">
            Mindrift combines adaptive AI systems, behavioral intelligence,
            focus engineering, and memory augmentation into one cognitive
            operating system.
          </p>
        </div>

        {/* bento grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[260px]">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
