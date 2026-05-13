import { BrainDumpAIResult, MindriftTask } from '@/lib/brain-dump/types';
import { motion } from 'framer-motion';
import { Bot, Play, RotateCcw, ShieldAlert } from 'lucide-react';

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
  if (!nextTask) {
    return (
      <section className="rounded-[36px] border border-emerald-400/20 bg-emerald-400/6 p-8">
        <h2 className="text-2xl font-medium text-white">
          You're clear for now.
        </h2>
        <p className="mt-3 text-zinc-400">
          Mindrift has no active next step. You can rest or add another brain
          dump.
        </p>
      </section>
    );
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
            <Bot size={38} className="text-cyan-300" />
          </motion.div>

          <div>
            <h2 className="text-2xl font-medium text-white">
              {guidedMode ? "Guided flow active" : "Ready to start gently"}
            </h2>
            <p className="mt-1 text-zinc-500">
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
              <p className="text-xl leading-9 text-zinc-200">
                Start with: <span className="text-white">{nextTask.title}</span>
              </p>

              <p className="mt-3 text-zinc-500">{nextTask.reason}</p>

              <p className="mt-4 text-zinc-500">{result.gentleMessage}</p>
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