import { TaskStatus } from '@/lib/brain-dump/types';

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const styles: Record<TaskStatus, string> = {
    pending: "border-white/10 bg-white/[0.04] text-zinc-400",
    active: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    paused: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
    rescheduled: "border-violet-400/20 bg-violet-400/10 text-violet-300",
    skipped: "border-zinc-400/20 bg-zinc-400/10 text-zinc-300",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}