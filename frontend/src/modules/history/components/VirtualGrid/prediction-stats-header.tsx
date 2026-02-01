import { HTMLAttributes } from "react";
import { cn } from "../../../../utils/cn";
import { BarChart3, Clock, CheckCircle2, Loader2 } from "lucide-react";

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
      className={cn(
        "sticky top-0 z-10 bg-card/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-border/50 mb-6 shadow-sm",
        props.className,
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-3 text-foreground font-semibold">
          <div className="p-1.5 rounded-lg bg-primary/10 ">
            <BarChart3 className="size-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">{totalCount} loaded</span>
            {isLoadingMore && (
              <div className="flex items-center gap-1.5 text-muted-foreground font-normal">
                <Loader2 className="size-3 animate-spin" />
                <span className="text-[10px]">Updating...</span>
              </div>
            )}
          </div>
        </div>

        {delayedCount !== undefined && delayedCount > 0 && (
          <div className="flex items-center gap-3 text-destructive font-semibold border-l border-border/50 pl-6">
            <div className="p-1.5 rounded-lg bg-destructive/10">
              <Clock className="size-4" />
            </div>
            <span className="leading-tight">{delayedCount} delayed</span>
          </div>
        )}

        {onTimeCount !== undefined && onTimeCount > 0 && (
          <div className="flex items-center gap-3 text-green-500 font-semibold border-l border-border/50 pl-6">
            <div className="p-1.5 rounded-lg bg-green-500/10">
              <CheckCircle2 className="size-4" />
            </div>
            <span className="leading-tight">{onTimeCount} on time</span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
}
