import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative flex items-center justify-center h-10 w-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 overflow-hidden">
        <div className="absolute inset-0 bg-cyan-400/10 blur-xl" />

        <div className="relative h-4 w-4 rounded-full bg-linear-to-br from-cyan-300 to-violet-400" />
      </div>

      <div>
        <div className="text-lg font-semibold tracking-tight text-white">
          Mindrift
        </div>

        <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          Cognitive OS
        </div>
      </div>
    </Link>
  );
};

export default Logo;
