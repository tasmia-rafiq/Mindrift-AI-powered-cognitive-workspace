"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { t: "W1", v: 30 },
  { t: "W2", v: 40 },
  { t: "W3", v: 35 },
  { t: "W4", v: 55 },
  { t: "W5", v: 50 },
  { t: "W6", v: 65 },
  { t: "W7", v: 60 },
];

export default function BurnoutPulseChart() {
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];

  const risk =
    latest.v > 60
      ? "High"
      : latest.v > 45
      ? "Moderate"
      : "Low";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-6">

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl! mb-2 font-medium">
            Burnout Risk Analysis
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            AI models emotional + workload fatigue signals
          </p>
        </div>

        <div className="text-right">
          <div
            className={`text-sm ${
              risk === "High"
                ? "text-red-300"
                : risk === "Moderate"
                ? "text-orange-300"
                : "text-green-300"
            }`}
          >
            {risk} Risk
          </div>

          <div className="text-xs text-zinc-500">
            Score: {latest.v}/100
          </div>
        </div>
      </div>

      {/* explanation */}
      <div className="mt-4 text-sm text-zinc-400">
        {risk === "High"
          ? "Your workload intensity has crossed sustainable cognitive limits."
          : risk === "Moderate"
          ? "Your stress levels are rising but still manageable."
          : "Your system is currently stable and recoverable."}
      </div>

      <div className="h-45 mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="t" stroke="#666" />
            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />

            <Line
              type="monotone"
              dataKey="v"
              stroke="#A78BFA"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300">
        🧠 AI Recommendation: Take a 30-45 min recovery break after every deep work block.
      </div>
    </div>
  );
}