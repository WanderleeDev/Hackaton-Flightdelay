import GradientOverlayCard from "@/src/modules/shared/components/gradient-overlay-card";
import { Skeleton } from "@/components/ui/skeleton";
import PredictionCardSkeleton from "./prediction-card-skeleton";

export default function LoteDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-6 w-32" />
      </div>

      <GradientOverlayCard>
        <div className="flex flex-col gap-6 mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-primary/20 rounded-full animate-pulse" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-9 w-80 max-w-full" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex items-center gap-2.5">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-7 w-20 rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-3/4 max-w-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 relative z-10">
          {[...Array(8)].map((_, i) => (
            <PredictionCardSkeleton key={i} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </GradientOverlayCard>
    </div>
  );
}
