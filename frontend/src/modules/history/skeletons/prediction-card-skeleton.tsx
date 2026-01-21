import { Skeleton } from "@/components/ui/skeleton";

export default function PredictionCardSkeleton() {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 h-[300px] flex flex-col justify-between">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      <div className="space-y-4">
        {[...Array(4)].map((_, j) => (
          <div key={j} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
