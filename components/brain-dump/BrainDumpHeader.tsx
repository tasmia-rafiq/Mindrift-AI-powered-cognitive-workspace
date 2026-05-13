import { Sparkles } from "lucide-react";

export default function BrainDumpHeader ({
  progress,
  pressureLevel,
}: {
  progress: number;
  pressureLevel: string;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-400">
          <Sparkles size={15} className="text-cyan-300" />
          Brain Dump Inbox
        </div>

        <h1 className="mt-5 text-[2.5rem]! font-semibold leading-tight text-white lg:text-5xl">
          Empty your mind.
          <span className="block bg-linear-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
            Then let Mindrift guide you.
          </span>
        </h1>

        <p className="mt-2 max-w-2xl text-zinc-300">
          Write the messy thoughts. Mindrift turns them into a calm plan, starts
          the first step, tracks progress, and adjusts when you feel stuck.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MiniStat label="Progress" value={`${progress}%`} />
        <MiniStat label="Pressure" value={pressureLevel} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 px-5 py-4">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-lg font-medium text-white">{value}</div>
    </div>
  );
}