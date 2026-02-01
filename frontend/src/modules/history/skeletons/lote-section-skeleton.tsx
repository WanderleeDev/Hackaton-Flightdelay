import GradientOverlayCard from "@/src/modules/shared/components/gradient-overlay-card";
import { Skeleton } from "@/components/ui/skeleton";
import PredictionCardSkeleton from "./prediction-card-skeleton";

export default function LoteSectionSkeleton() {
  return (
    <GradientOverlayCard>
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 bg-primary/20 rounded-full animate-pulse" />
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Grid of Card Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {[...Array(4)].map((_, i) => (
          <PredictionCardSkeleton key={i} />
        ))}
      </div>
    </GradientOverlayCard>
  );
}
