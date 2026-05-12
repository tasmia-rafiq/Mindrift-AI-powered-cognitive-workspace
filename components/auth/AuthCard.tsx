"use client";

import { motion } from "framer-motion";

export default function AuthCard({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md overflow-hidden rounded-4xl border border-white/10 bg-white/4 backdrop-blur-2xl"
    >
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />

      <div className="relative z-10 p-8">
        {/* heading */}
        <div className="mt-4">
          <h1 className="text-3xl! font-semibold tracking-tight">
            {title}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {subtitle}
          </p>
        </div>

        {/* content */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
}