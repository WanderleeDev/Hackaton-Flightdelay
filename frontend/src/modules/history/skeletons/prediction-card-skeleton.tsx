import { Skeleton } from "@/components/ui/skeleton";

export default function PredictionCardSkeleton() {
  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 h-[320px] sm:h-[350px] flex flex-col justify-between animate-pulse">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <Skeleton className="h-5 sm:h-6 w-16 sm:w-20 rounded-full bg-muted-foreground/10" />
        <Skeleton className="h-3 sm:h-4 w-12 sm:w-16 bg-muted-foreground/10" />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex flex-col gap-2 min-w-0">
          <Skeleton className="h-2.5 sm:h-3 w-6 sm:w-8 bg-muted-foreground/10" />
          <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 bg-muted-foreground/10" />
        </div>
        <div className="flex-1 flex items-center gap-1 sm:gap-2 mb-[-8px] sm:mb-[-12px]">
          <div className="h-[1px] sm:h-[1px] flex-1 border-b border-dashed border-border/30"></div>
          <Skeleton className="size-4 sm:size-5 rounded-full bg-muted-foreground/10 shrink-0" />
          <div className="h-[1px] sm:h-[1px] flex-1 border-b border-dashed border-border/30"></div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-0">
          <Skeleton className="h-2.5 sm:h-3 w-6 sm:w-8 bg-muted-foreground/10" />
          <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 bg-muted-foreground/10" />
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {[...Array(5)].map((_, j) => (
          <div key={j} className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Skeleton className="size-3.5 sm:size-4 rounded bg-muted-foreground/10 shrink-0" />
              <Skeleton className="h-2.5 sm:h-3 w-12 sm:w-16 bg-muted-foreground/10" />
            </div>
            <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-24 bg-muted-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
