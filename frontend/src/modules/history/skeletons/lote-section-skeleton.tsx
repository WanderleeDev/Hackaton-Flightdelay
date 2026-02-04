import PredictionCardWrapper from "@/src/modules/shared/components/prediction-card-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import PredictionCardSkeleton from "./prediction-card-skeleton";

export default function LoteSectionSkeleton() {
  return (
    <PredictionCardWrapper className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Skeleton className="size-5 rounded bg-primary/20" />
          </div>
          <div className="flex items-baseline gap-2 sm:gap-4 md:gap-6">
            <Skeleton className="h-7 sm:h-8 w-40 sm:w-64" />
            <Skeleton className="h-5 sm:h-7 w-12 sm:w-20" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4">
          <div className="flex items-center gap-2.5">
            <Skeleton className="p-1.5 rounded-lg h-7 w-7 bg-muted-foreground/10" />
            <Skeleton className="h-4 w-28 sm:w-32 bg-muted-foreground/10" />
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="p-1.5 rounded-lg h-7 w-7 bg-muted-foreground/10" />
            <Skeleton className="h-4 w-20 sm:w-24 bg-muted-foreground/10" />
          </div>
        </div>
      </div>

      {/* Grid of Card Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 relative z-10">
        {[...Array(4)].map((_, i) => (
          <PredictionCardSkeleton key={i} />
        ))}
      </div>
    </PredictionCardWrapper>
  );
}
