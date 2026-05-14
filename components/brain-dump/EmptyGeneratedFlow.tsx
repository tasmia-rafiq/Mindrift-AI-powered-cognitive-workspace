import { Inbox } from "lucide-react";

export default function EmptyGeneratedFlow() {
  return (
    <div className="rounded-4xl border border-white/10 bg-white/3 p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/4">
        <Inbox className="text-zinc-500" />
      </div>

      <h2 className="mt-6 text-2xl font-medium text-white">
        No saved Mind Unload yet
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-zinc-500">
        Write what is on your mind above. Mindrift will organize it, save the
        plan, and keep it here for later.
      </p>
    </div>
  );
}