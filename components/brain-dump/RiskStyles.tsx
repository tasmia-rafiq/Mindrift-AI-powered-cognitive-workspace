export default function RiskStyles(level: string) {
  if (level === "High") return "text-red-300 border-red-400/20 bg-red-400/10";
  if (level === "Medium")
    return "text-orange-300 border-orange-400/20 bg-orange-400/10";
  return "text-emerald-300 border-emerald-400/20 bg-emerald-400/10";
}