import { HTMLAttributes } from "react";
import { cn } from "../../../shared/utils/cn";

type PredictionStatsHeaderProps = HTMLAttributes<HTMLDivElement> & {
  totalCount: number;
  onTimeCount?: number;
  delayedCount?: number;
  isLoadingMore?: boolean;
  children?: React.ReactNode;
};

export default function PredictionStatsHeader({
  totalCount,
  delayedCount,
  onTimeCount,
  isLoadingMore = false,
  children,
  ...props
}: PredictionStatsHeaderProps) {
  return (
    <div
      className={`${cn("sticky top-0 z-10 bg-card/95 backdrop-blur-sm p-3 rounded-t-xl border-b border-border/50 mb-4", props.className)}`}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="font-medium">
          📊 {totalCount} loaded
          {isLoadingMore && " • Loading more..."}
        </span>
        {delayedCount && (
          <span className="text-destructive">⏰ {delayedCount} delayed</span>
        )}
        {onTimeCount && (
          <span className="text-chart-3">✓ {onTimeCount} on time</span>
        )}
        <div className="ml-auto">{children}</div>
      </div>
    </div>
  );
}
