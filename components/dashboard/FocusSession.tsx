"use client";

export default function FocusSession() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 px-6 py-8">

      <h2 className="text-3xl! font-medium">
        Focus Session
      </h2>

      <div className="mt-6 flex items-center justify-center">
        <div className="relative h-40 w-40 rounded-full border border-white/10 flex items-center justify-center">
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-cyan-400/20 to-violet-400/20 animate-pulse" />

          <div className="text-center z-10">
            <div className="text-3xl font-semibold">25:00</div>
            <div className="text-xs text-zinc-500 mt-1">
              Focus Session Ready
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2 justify-center">
        <button className="px-4 py-2 rounded-xl bg-white text-black">
          Start
        </button>
        <button className="px-4 py-2 rounded-xl border border-white/10">
          Pause
        </button>
      </div>

      <p className="text-xs text-center text-zinc-500 mt-4">
        AI suggests starting now based on your peak focus window.
      </p>
    </div>
  );
}