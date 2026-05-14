import { BrainDumpAIResult, MindriftTask } from "@/lib/brain-dump/types";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function GuidedActionCenter({
  result,
  nextTask,
  guidedMode,
  rescueMode,
  onStart,
  onRescue,
  onReschedule,
}: {
  result: BrainDumpAIResult;
  nextTask?: MindriftTask;
  guidedMode: boolean;
  rescueMode: boolean;
  onStart: () => void;
  onRescue: () => void;
  onReschedule: (id: string) => void;
}) {
  const isFlowCompleted = !nextTask;

  if (isFlowCompleted) {
    return <CompletedGuidedFlow result={result} />;
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/4 p-8 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-400/5 via-transparent to-violet-400/5" />

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="flex items-center gap-5">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-cyan-400/20 bg-cyan-400/10"
          >
            <Image src="/miro.png" alt="Miro" width={40} height={40} />
          </motion.div>

          <div>
            <h2 className="text-3xl! font-semibold! text-white">
              {guidedMode ? "Guided flow active" : "Ready to start calmly"}
            </h2>
            <p className="mt-2 text-zinc-400">
              Mindrift will walk with you one step at a time.
            </p>
          </div>
        </div>

        <div>
          {rescueMode ? (
            <div className="rounded-3xl border border-orange-400/20 bg-orange-400/8 p-5">
              <div className="flex items-center gap-2 text-orange-300">
                <ShieldAlert size={18} />
                Rescue mode is on
              </div>

              <p className="mt-3 leading-7 text-zinc-300">
                We made this smaller. For now, only do the first tiny step:
                <span className="text-white"> {nextTask.tinySteps[0]}.</span>
              </p>
            </div>
          ) : (
            <>
              <p className="text-2xl font-medium text-zinc-200">
                Start with: <span className="text-white">{nextTask.title}</span>
              </p>

              <p className="mt-2 text-zinc-300">~ {nextTask.reason}</p>

              <p className="mt-4 text-zinc-400">{result.gentleMessage}</p>
            </>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              {guidedMode ? "Open focus session" : "Start guided focus"}
              <Play size={17} />
            </button>

            <button
              onClick={onRescue}
              className="inline-flex items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-400/6 px-5 py-3 text-orange-200 transition hover:bg-orange-400/10"
            >
              I feel overwhelmed
              <ShieldAlert size={17} />
            </button>

            <button
              onClick={() => onReschedule(nextTask.id)}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-zinc-300 transition hover:bg-white/5"
            >
              Move this later
              <RotateCcw size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompletedGuidedFlow({ result }: { result: BrainDumpAIResult }) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-emerald-400/20 bg-emerald-400/4.5 p-8 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-400/10 via-transparent to-cyan-400/5" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-[90px]" />

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="flex items-center gap-5">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-emerald-400/20 bg-emerald-400/10"
          >
            <Image src="/miro.png" alt="Miro" width={40} height={40} />
          </motion.div>

          <div>
            <h2 className="text-3xl! font-semibold! text-white">
              This flow is complete.
            </h2>
            <p className="mt-2 text-zinc-400">
              Miro has nothing left to guide in this plan.
            </p>
          </div>
        </div>

        <div>
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/8 p-5">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 size={18} />
              All tasks are done
            </div>

            <p className="mt-3 leading-7 text-zinc-300">
              You completed everything from{" "}
              <span className="text-white">“{result.title}”</span>. This is
              cleared now — you can rest, review your history, or create a new
              Mind Unload if something else is on your mind.
            </p>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-zinc-300">
            <Sparkles size={16} className="text-emerald-300" />
            Nothing urgent left in this flow.
          </div>
        </div>
      </div>
    </section>
  );
}