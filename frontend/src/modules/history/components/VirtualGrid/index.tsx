"use client";

import { useRef } from "react";
import { VirtuosoGridHandle } from "react-virtuoso";
import { ArrowUp } from "lucide-react";
import { useInfinitePrediction } from "../../hooks/useInfinitePrediction";
import PredictionCardB from "../prediction-card-b";
import PredictionStatsHeader from "./prediction-stats-header";
import VirtualGridInfinite from "./virtual-grid-infinite";
import { Button } from "@/components/ui/button";

export default function ListPredictions() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePrediction();
  const gridRef = useRef<VirtuosoGridHandle>(null);
  const allPredictions = data?.pages.flatMap((page) => page.content) ?? [];

  const delayed = allPredictions?.filter((p) => p.status === "delayed")?.length;
  const succeeded = allPredictions?.filter(
    (p) => p?.status === "succeeded",
  )?.length;

  const handleScrollToTop = () => gridRef.current?.scrollToIndex({ index: 0 });

  return (
    <div className="flex flex-col w-full h-full">
      {allPredictions.length > 0 && (
        <PredictionStatsHeader
          totalCount={allPredictions.length}
          delayedCount={delayed}
          onTimeCount={succeeded}
        >
          <Button
            onClick={handleScrollToTop}
            size="icon-sm"
            className="rounded-xl cursor-pointer"
          >
            <span className="sr-only">Scroll to top</span>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </PredictionStatsHeader>
      )}

      <VirtualGridInfinite
        ref={gridRef}
        data={allPredictions}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(index: number, item: any) => (
          <PredictionCardB {...item} data-index={index} />
        )}
      />
    </div>
  );
}
