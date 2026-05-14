function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-white/6 ${className}`}
    />
  );
}

export function CurrentFlowSkeleton() {
  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-white/3 p-5">
        <SkeletonBlock className="h-6 w-40" />
        <SkeletonBlock className="mt-4 h-8 w-80 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <SkeletonBlock className="h-28 lg:col-span-2" />
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
      </div>

      <SkeletonBlock className="h-48" />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <SkeletonBlock className="h-105" />
        <SkeletonBlock className="h-105" />
      </div>
    </div>
  );
}

export function HistorySkeleton() {
  return (
    <section className="rounded-4xl border border-white/10 bg-white/3 p-6">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-9 w-28" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-black/20 p-5"
          >
            <SkeletonBlock className="h-5 w-36" />
            <SkeletonBlock className="mt-4 h-4 w-28" />
            <SkeletonBlock className="mt-5 h-12 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}