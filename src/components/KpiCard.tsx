import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  accent?: string;
}

export default function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  accent = "#3b82f6",
}: KpiCardProps) {
  return (
    <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.05] transition-colors duration-200 group">
      {/* Accent line */}
      <div
        className="absolute top-0 left-5 right-5 h-px opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className="flex items-center justify-between mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}12` }}
        >
          <Icon size={17} style={{ color: accent }} strokeWidth={1.8} />
        </div>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-[11px] font-medium ${
            trend === "up" ? "text-emerald-400" : "text-rose-400"
          }`}>
            {trend === "up" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <p className="text-[22px] font-semibold text-white tracking-tight leading-none">{value}</p>
      <p className="text-[11px] text-white/40 mt-2 font-medium">{title}</p>
      {subtitle && (
        <p className="text-[10px] text-white/25 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
