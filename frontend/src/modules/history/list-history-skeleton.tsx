import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ListHistorySkeleton() {
  return (
    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar p-2 w-full rounded-md gap-2 border max-w-3xl mx-auto">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden border-muted/50 shadow-sm">
          <CardContent className="p-4">
            {/* Header: Status and Time */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-5 w-16 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>

            {/* Body: Origin - Path - Destination */}
            <div className="flex items-center justify-between gap-2">
              {/* Origin */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-2 w-10 ml-1" />
              </div>

              {/* Flight Path */}
              <div className="flex-1 flex flex-col items-center gap-1 px-4">
                <div className="w-full relative flex items-center">
                  <Skeleton className="h-[1px] w-full" />
                  <Skeleton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full" />
                </div>
                <Skeleton className="h-2 w-16 mt-1" />
              </div>

              {/* Destination */}
              <div className="flex flex-col gap-1 items-end min-w-0">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-2 w-10 mr-1" />
              </div>
            </div>

            <Skeleton className="my-4 h-[1px] w-full" />

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-2 w-24" />
              </div>
              <Skeleton className="h-2 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
