"use client";

import type { BrainDumpAIResult, MindriftTask } from "@/lib/brain-dump/types";
import { formatDumpDate, isToday } from "@/lib/format-date";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  Heart,
  Sparkles,
  Tags,
  Trophy,
} from "lucide-react";
import RiskStyles from "./RiskStyles";

export default function AiInsights({
  result,
  tasks,
}: {
  result: BrainDumpAIResult;
  tasks: MindriftTask[];
}) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const isCompleted = totalTasks > 0 && completedTasks === totalTasks;

  if (isCompleted) {
    return (
      <CompletedMindUnload
        result={result}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:p-8">
      <div className="absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-violet-500/5" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/6 blur-[90px]" />
      <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-violet-400/6 blur-[90px]" />

      <div className="relative z-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
              <Sparkles size={13} />
              {isToday(result.createdAt)
                ? "Today's Mind Unload"
                : "Saved Mind Unload"}
            </div>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white lg:text-4xl">
              {result.title}
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-400">
              {result.summary}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-zinc-400" />
              {formatDumpDate(result.createdAt)}
            </div>
          </div>
        </div>

        <div className="my-7 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <InsightMetric
            icon={Heart}
            label="Mood detected"
            value={result.emotionalTone}
            description="How your tone feels right now."
          />

          <InsightMetric
            icon={Flame}
            label="Burnout risk"
            value={result.burnoutLevel}
            description="How heavy today may feel."
            badgeClass={RiskStyles(result.burnoutLevel)}
          />

          <InsightMetric
            icon={Clock3}
            label="Urgency"
            value={result.urgencyLevel}
            description="How quickly this needs attention."
            badgeClass={RiskStyles(result.urgencyLevel)}
          />
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-(--bg-900)/50 p-5">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Tags size={16} className="text-zinc-400" />
            Mindrift sorted this into
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {result.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-zinc-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompletedMindUnload({
  result,
  totalTasks,
  completedTasks,
}: {
  result: BrainDumpAIResult;
  totalTasks: number;
  completedTasks: number;
}) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-emerald-400/20 bg-emerald-400/4.5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:p-8">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-400/10 via-transparent to-cyan-400/5" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-[90px]" />
      <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-400/6 blur-[90px]" />

      <div className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <CheckCircle2 size={13} />
              Mind Unload completed
            </div>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white lg:text-4xl">
              You cleared this flow.
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-300">
              Everything Mindrift created from{" "}
              <span className="text-white">“{result.title}”</span> is done.
              You do not need to keep carrying this in your head anymore.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-zinc-400" />
              {formatDumpDate(result.createdAt)}
            </div>
          </div>
        </div>

        <div className="my-7 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CompletionMetric
            icon={Trophy}
            label="Progress"
            value="100%"
            description={`${completedTasks}/${totalTasks} tasks completed`}
          />

          <CompletionMetric
            icon={CheckCircle2}
            label="Pressure"
            value="Cleared"
            description="This plan no longer needs attention."
          />

          <CompletionMetric
            icon={Sparkles}
            label="Next"
            value="Rest or unload again"
            description="Add a new Mind Unload only if something else is weighing on you."
          />
        </div>

        <div className="mt-6 rounded-[28px] border border-emerald-400/20 bg-black/25 p-5">
          <div className="text-sm text-emerald-300">Mindrift note</div>

          <p className="mt-3 leading-7 text-zinc-300">
            Nice. This is not about doing more — it is about feeling lighter.
            Take a moment before starting anything new.
          </p>
        </div>
      </div>
    </section>
  );
}

function InsightMetric({
  icon: Icon,
  label,
  value,
  description,
  className = "",
  badgeClass = "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
}: {
  icon: any;
  label: string;
  value: string;
  description: string;
  className?: string;
  badgeClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group rounded-[28px] border border-white/10 bg-(--bg-900)/50 p-5 transition hover:bg-white/4 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-zinc-400">{label}</div>
          <div className="mt-2 text-xl font-medium text-white">{value}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{description}</p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${badgeClass}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}

function CompletionMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: any;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/6 p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-emerald-300">{label}</div>
          <div className="mt-2 text-xl font-medium text-white">{value}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{description}</p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}