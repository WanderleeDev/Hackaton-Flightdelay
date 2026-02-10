import { Skeleton } from "@/components/ui/skeleton";
import PredictionCardWrapper from "../../shared/components/prediction-card-wrapper";

export default function ListHistorySkeleton() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="pb-3">
          <PredictionCardWrapper className="p-4 @container opacity-50">
            <div className="flex justify-between items-center mb-4 gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 min-w-0">
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 min-w-0">
                  <Skeleton className="size-6 sm:size-8 rounded-full shrink-0" />
                  <Skeleton className="h-5 w-16 hidden @min-[200px]:block" />
                </div>
                <Skeleton className="h-2 w-10 ml-1" />
              </div>

              <div className="shrink-0 flex flex-col items-center gap-1 px-2 sm:px-4 flex-1">
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-2 w-12 hidden sm:block mt-1" />
              </div>

              <div className="flex flex-col gap-1 items-end min-w-0 text-right flex-1">
                <div className="flex items-center gap-2 min-w-0">
                  <Skeleton className="h-5 w-16 hidden @min-[200px]:block" />
                  <Skeleton className="size-6 sm:size-8 rounded-full shrink-0" />
                </div>
                <Skeleton className="h-2 w-10 mr-1" />
              </div>
            </div>

            <Skeleton className="my-4 h-px w-full opacity-20" />

            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-1 min-w-0">
                <Skeleton className="h-3 w-3 shrink-0" />
                <Skeleton className="h-2 w-24 truncate" />
              </div>
              <Skeleton className="h-2 w-20 shrink-0" />
            </div>
          </PredictionCardWrapper>
        </div>
      ))}
    </div>
  );
}
