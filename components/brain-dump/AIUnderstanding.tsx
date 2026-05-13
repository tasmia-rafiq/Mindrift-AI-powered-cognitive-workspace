import { BrainDumpAIResult } from '@/lib/brain-dump/types';
import { motion } from 'framer-motion';
import { Clock3, Flame, Heart } from 'lucide-react';
import RiskStyles from './RiskStyles';

export default function AIUnderstanding({ result }: { result: BrainDumpAIResult }) {
  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-4">
      <InfoCard
        icon={Heart}
        title="Emotional tone"
        value={result.emotionalTone}
        className="lg:col-span-2"
      />

      <InfoCard
        icon={Flame}
        title="Burnout level"
        value={result.burnoutLevel}
        badgeClass={RiskStyles(result.burnoutLevel)}
      />

      <InfoCard
        icon={Clock3}
        title="Urgency"
        value={result.urgencyLevel}
        badgeClass={RiskStyles(result.urgencyLevel)}
      />

      <div className="lg:col-span-4 rounded-[30px] border border-white/10 bg-white/3 p-6">
        <h2 className="text-2xl! font-medium! text-white">
          What Mindrift understood
        </h2>

        <p className="mt-2 max-w-4xl leading-8 text-zinc-300">
          {result.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {result.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
  className = "",
  badgeClass = "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
}: {
  icon: any;
  title: string;
  value: string;
  className?: string;
  badgeClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[28px] border border-white/10 bg-white/3 p-6 backdrop-blur-2xl ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-zinc-500">{title}</div>
          <div className="mt-2 text-xl font-medium text-white">{value}</div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${badgeClass}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}