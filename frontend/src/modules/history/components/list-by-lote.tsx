"use client";

import { useInfinitePredictionByLote } from "@/src/modules/history/hooks/useInfinitePredictionByLote";
import LoteSection from "@/src/modules/history/components/lote-section";
import PredictionCardB from "@/src/modules/history/components/prediction-card-b";
import PredictionStatsHeader from "@/src/modules/history/components/VirtualGrid/prediction-stats-header";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import LoaderObserver from "@/components/shared/loader-observer";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";

export default function ListByLote() {
  const { data, fetchNextPage, hasNextPage } = useInfinitePredictionByLote();
  const allLotes = data ? data.pages.flatMap((page) => page.content) : [];
  const virtualizer = useWindowVirtualizer({
    count: allLotes.length,
    estimateSize: () => 200,
    overscan: 3,
  });
  const virtualItems = virtualizer.getVirtualItems();

  const handleScrollToTop = () => window.scrollTo({ top: 0 });

  return (
    <>
      {allLotes.length > 0 && (
        <PredictionStatsHeader
          totalCount={allLotes.length}
          isLoadingMore={hasNextPage}
          className="sticky top-20 z-50"
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
      <div className="overflow-auto">
        <div
          className="relative"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          <div
            className="absolute top left-0 w-full"
            style={{
              transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            }}
          >
            {virtualItems.map(({ index, key }) => {
              const lote = allLotes[index];
              return (
                <div
                  className="my-12"
                  key={key}
                  data-index={index}
                  ref={virtualizer.measureElement}
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
            {hasNextPage && (
              <LoaderObserver
                action={fetchNextPage}
                label="loading more lotes..."
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
