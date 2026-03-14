import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { GlowCard } from "./GlowCard";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  glow?: boolean;
}

export function StatCard({ icon: Icon, label, value, subtitle, trend, glow = false }: StatCardProps) {
  const trendColor = trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-muted-foreground";

  return (
    <GlowCard glow={glow} className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-5 h-5 ${glow ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
          <p className={`text-2xl mb-1 ${glow ? "text-glow-pink" : ""}`}>{value}</p>
          {subtitle && (
            <p className={`text-sm ${trendColor}`}>{subtitle}</p>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
