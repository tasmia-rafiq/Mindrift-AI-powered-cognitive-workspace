import { MindriftTask } from "@/lib/brain-dump/types";
import { motion } from "framer-motion";
import { Check, Pause, Play, ShieldAlert, Sparkles } from "lucide-react";

export default function TaskFocusSession({
  task,
  currentStepIndex,
  sessionSeconds,
  isRunning,
  onCompleteStep,
  onPause,
  onResume,
  onExit,
  onRescue,
}: {
  task: MindriftTask;
  currentStepIndex: number;
  sessionSeconds: number;
  isRunning: boolean;
  onCompleteStep: () => void;
  onPause: () => void;
  onResume: () => void;
  onExit: () => void;
  onRescue: () => void;
}) {
  const minutes = Math.floor(sessionSeconds / 60);
  const seconds = String(sessionSeconds % 60).padStart(2, "0");

  const progress = ((currentStepIndex + 1) / task.tinySteps.length) * 100;

  const isLastStep = currentStepIndex === task.tinySteps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.65)] lg:p-8"
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-400/6 via-transparent to-violet-400/6" />

        <div className="relative z-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                <Sparkles size={15} />
                Guided focus session
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
                {task.title}
              </h2>

              <p className="mt-3 max-w-xl text-zinc-500">
                Mindrift will only ask you to do one small step at a time.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/30 px-8 py-6 text-center">
              <div className="text-sm text-zinc-500">Focus timer</div>
              <div className="mt-2 text-4xl font-semibold text-white">
                {minutes}:{seconds}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            {/* progress ring */}
            <div className="rounded-4xl border border-white/10 bg-black/25 p-6">
              <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-white/10">
                <div
                  className="absolute inset-3 rounded-full"
                  style={{
                    background: `conic-gradient(rgba(125,211,252,0.9) ${progress}%, rgba(255,255,255,0.08) ${progress}%)`,
                  }}
                />

                <div className="absolute inset-8 rounded-full bg-[#0d0d0d]" />

                <div className="relative text-center">
                  <div className="text-4xl font-semibold text-white">
                    {Math.round(progress)}%
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">
                    session progress
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-4 text-center text-sm text-zinc-400">
                {isRunning
                  ? "You're in focus mode. Keep it small and simple."
                  : "Paused. You can resume when ready."}
              </div>
            </div>

            {/* step guidance */}
            <div className="rounded-4xl border border-white/10 bg-black/25 p-6">
              <div className="text-sm text-zinc-500">
                Step {currentStepIndex + 1} of {task.tinySteps.length}
              </div>

              <h3 className="mt-4 text-2xl font-medium leading-snug text-white">
                {task.tinySteps[currentStepIndex]}
              </h3>

              <p className="mt-4 leading-7 text-zinc-500">
                Do only this. Do not think about the full task yet. Mindrift is
                holding the rest for you.
              </p>

              <div className="mt-8 space-y-3">
                {task.tinySteps.map((step, index) => (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-sm ${
                      index < currentStepIndex
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : index === currentStepIndex
                          ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                          : "border-white/10 bg-white/3 text-zinc-500"
                    }`}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-xs">
                      {index < currentStepIndex ? (
                        <Check size={14} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {step}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={onCompleteStep}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
                >
                  {isLastStep ? "Finish session" : "Step done"}
                  <Check size={17} />
                </button>

                {isRunning ? (
                  <button
                    onClick={onPause}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-zinc-300 transition hover:bg-white/5"
                  >
                    Pause
                    <Pause size={17} />
                  </button>
                ) : (
                  <button
                    onClick={onResume}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-zinc-300 transition hover:bg-white/5"
                  >
                    Resume
                    <Play size={17} />
                  </button>
                )}

                <button
                  onClick={onRescue}
                  className="inline-flex items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-400/6 px-5 py-3 text-orange-200 transition hover:bg-orange-400/10"
                >
                  Too much
                  <ShieldAlert size={17} />
                </button>

                <button
                  onClick={onExit}
                  className="rounded-2xl border border-white/10 px-5 py-3 text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}