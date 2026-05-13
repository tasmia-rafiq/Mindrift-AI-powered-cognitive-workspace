import { Wand2 } from "lucide-react";
import MindriftGuide from "./MindriftGuide";

export default function BrainDumpInput({
  input,
  setInput,
  onAnalyze,
  onReset,
  isThinking,
}: {
  input: string;
  setInput: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isThinking: boolean;
}) {
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:p-8">
      <div className="absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-violet-500/4" />

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-xl font-medium text-white">
            What’s overwhelming your mind right now?
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            No need to sort it. Write it exactly how it feels.
          </p>

          <div className="relative mt-5">
            <div className="absolute -inset-1 rounded-[30px] bg-linear-to-r from-cyan-400/10 via-white/5 to-violet-400/10 blur-xl" />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: I need to finish portfolio, reply to client, attend meeting, fix my sleep, complete assignment... and I feel tired."
              className="relative min-h-80 w-full resize-none rounded-[30px] border border-white/10 bg-black/30 p-6 text-lg leading-8 text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-white/20"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-zinc-500">
              {wordCount} words written
            </div>

            <div className="flex gap-3">
              <button
                onClick={onReset}
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:bg-white/4 hover:text-white"
              >
                Clear
              </button>

              <button
                onClick={onAnalyze}
                disabled={!input.trim() || isThinking}
                className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Organize and guide me
                <Wand2 size={17} />
              </button>
            </div>
          </div>
        </div>

        <MindriftGuide />
      </div>
    </section>
  );
}