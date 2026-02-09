import { cn } from "@/src/utils/cn";

interface MetricBarProps {
  label: string;
  count: number | string;
  percentage: number;
  color?: string;
}

export default function MetricBar({
  label,
  count,
  percentage,
  color = "#FF6900",
}: MetricBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{count}</span>
      </div>
      <div className="h-8 bg-secondary rounded-md overflow-hidden relative">
        <div
          className={cn(
            "h-full w-full transition-all duration-700 ease-out will-change-transform origin-left absolute left-0 top-0 starting:scale-x-0",
          )}
          style={{
            backgroundColor: color,
            transform: `scaleX(${percentage / 100})`,
          }}
        />
      </div>
    </div>
  );
}
