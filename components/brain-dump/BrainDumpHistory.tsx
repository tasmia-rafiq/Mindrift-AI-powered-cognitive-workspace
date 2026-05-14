import { Clock3, CalendarDays } from "lucide-react";
import type { BrainDumpAIResult } from "@/lib/brain-dump/types";
import { formatDumpDate, isToday } from "@/lib/format-date";

export default function BrainDumpHistory({
  dumps,
  selectedDumpId,
  onSelect,
}: {
  dumps: BrainDumpAIResult[];
  selectedDumpId?: string;
  onSelect: (dump: BrainDumpAIResult) => void;
}) {
  if (!dumps.length) return null;

  return (
    <section className="rounded-4xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Clock3 size={28} className="text-cyan-300" />
            <h2 className="text-3xl! font-semibold! text-white">
              Mind Unload history
            </h2>
          </div>

          <p className="mt-2 text-sm text-zinc-300">
            Your past generated flows stay saved here.
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-500">
          {dumps.length} saved flows
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dumps.map((dump) => {
          const active = dump.brainDumpId === selectedDumpId;

          return (
            <button
              key={dump.brainDumpId}
              onClick={() => onSelect(dump)}
              className={`group rounded-3xl border p-5 text-left transition ${
                active
                  ? "border-cyan-400/30 bg-cyan-400/10"
                  : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/4"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="line-clamp-1 font-medium text-white">
                  {dump.title}
                </h3>

                {isToday(dump.createdAt) && (
                  <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[11px] text-cyan-300">
                    Today
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                <CalendarDays size={14} />
                {formatDumpDate(dump.createdAt)}
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-400">
                {dump.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {dump.categories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-white/6 px-3 py-1 text-xs text-zinc-400"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}