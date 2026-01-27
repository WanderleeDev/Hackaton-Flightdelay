"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfinitePredictionByLote } from "@/src/modules/history/hooks/useInfinitePredictionByLote";
import LoteSection from "@/src/modules/history/components/lote-section";
import PredictionCardB from "@/src/modules/history/components/prediction-card-b";
import PredictionStatsHeader from "@/src/modules/history/components/VirtualGrid/prediction-stats-header";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import LoaderObserver from "@/components/shared/loader-observer";

export default function ListByLote() {
  const { data, fetchNextPage, hasNextPage } = useInfinitePredictionByLote();
  const allLotes = data ? data.pages.flatMap((page) => page.content) : [];
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: allLotes.length,
    gap: 64,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 2,
  });

  const handleScrollToTop = () => parentRef.current?.scrollTo({ top: 0 });

  return (
    <>
      {allLotes.length > 0 && (
        <PredictionStatsHeader
          totalCount={allLotes.length}
          isLoadingMore={hasNextPage}
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
      <div
        ref={parentRef}
        className="flex flex-col gap-8 relative z-10 overflow-auto"
        style={{ height: "calc(100vh - 280px)" }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const lote = allLotes[virtualItem.index];
            if (!lote) return null;

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <LoteSection
                  date={lote.createdAt}
                  title={lote.batchName}
                  simulationsCount={lote.total}
                  serialNumber={lote.serialNumber}
                >
                  {lote.histories.map((prediction) => (
                    <PredictionCardB key={prediction.id} {...prediction} />
                  ))}
                </LoteSection>
              </div>
            );
          })}
        </div>
        {hasNextPage && (
          <LoaderObserver
            action={fetchNextPage}
            label="loading more lotes..."
          />
        )}
      </div>
    </>
  );
}
