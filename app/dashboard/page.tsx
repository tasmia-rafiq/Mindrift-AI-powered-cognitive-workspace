"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import type { DashboardSummary } from "@/lib/dashboard/types";

import AIRecommendations from "@/components/dashboard/AIRecommendations";
import CognitiveTrendChart from "@/components/dashboard/CognitiveTrendChart";
import BurnoutPulseChart from "@/components/dashboard/BurnoutPulseChart";
import FocusSession from "@/components/dashboard/FocusSession";
import IntelligenceCore from "@/components/dashboard/IntelligenceCore";
import TodayPriorities from "@/components/dashboard/TodayPriorities";
import { BrainCircuit, CalendarDays, Play } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const response = await fetch("/api/dashboard/summary");
      const result = await response.json();

      setIsLoading(false);

      if (!response.ok) return;

      setData(result);
    }

    loadDashboard();
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  if (!data) {
    return (
      <div className="rounded-4xl border border-white/10 bg-white/3 p-8">
        <h2 className="text-2xl font-semibold text-white">
          No dashboard data yet
        </h2>
        <p className="mt-2 text-zinc-400">
          Create your first Mind Unload to generate your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl! font-semibold tracking-tight text-white">
            Mindrift Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-400">
            Your mental load, focus, tasks, and recovery signals in one calm
            workspace.
          </p>
        </div>

        <DashboardQuickActions />
      </div>

      {/* Hero Command Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <IntelligenceCore data={data.intelligence} />
        <DashboardNextAction data={data} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CognitiveTrendChart data={data.cognitiveTrend} />
        <BurnoutPulseChart data={data.burnoutTrend} />
      </div>

      <TodayPriorities tasks={data.todayTasks} />

      {/* Action + Focus */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <AIRecommendations items={data.recommendations} />
        <FocusSession data={data.focus} />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-24 animate-pulse rounded-[28px] bg-white/4" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="h-72 animate-pulse rounded-4xl bg-white/4" />
        <div className="h-72 animate-pulse rounded-4xl bg-white/4" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-4xl bg-white/4" />
        <div className="h-80 animate-pulse rounded-4xl bg-white/4" />
      </div>
    </div>
  );
}

const actions = [
  {
    label: "New Mind Unload",
    href: "/dashboard/brain-dump",
    icon: BrainCircuit,
    primary: true,
  },
  {
    label: "Open Planner",
    href: "/dashboard/planner",
    icon: CalendarDays,
  },
  {
    label: "Focus Mode",
    href: "/dashboard/focus-mode",
    icon: Play,
  },
];

function DashboardQuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.label}
            href={action.href}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition hover:scale-[1.02] ${
              action.primary
                ? "bg-white text-black"
                : "border border-white/10 bg-white/3 text-zinc-300 hover:bg-white/6"
            }`}
          >
            <Icon size={16} />
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}

function DashboardNextAction({
  data,
}: {
  data: DashboardSummary;
}) {
  const nextTask = data.focus.activeTaskTitle;

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-400/5 via-transparent to-violet-400/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"
          >
            <Image src="/miro.png" alt="Miro" width={34} height={34} />
          </motion.div>

          <div>
            <div className="text-sm text-zinc-400">Miro suggests</div>
            <h2 className="text-3xl! font-semibold text-white">
              Next best action
            </h2>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-5">
          {nextTask ? (
            <>
              <p className="text-lg font-medium text-white">{nextTask}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                This is the next task Mindrift thinks you should continue based
                on your current plan.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-white">
                Nothing urgent right now
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                You can rest, review your plan, or create a new Mind Unload.
              </p>
            </>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/dashboard/brain-dump"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            Continue in Mind Unload
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/dashboard/brain-dump"
            className="inline-flex items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-400/6 px-5 py-3 text-sm text-orange-200 transition hover:bg-orange-400/10"
          >
            I feel overwhelmed
            <ShieldAlert size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}