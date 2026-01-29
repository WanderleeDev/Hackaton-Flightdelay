"use client";

import { useInfinitePredictionByLote } from "@/src/modules/history/hooks/useInfinitePredictionByLote";
import LoteSection from "@/src/modules/history/components/lote-section";
import PredictionCardB from "@/src/modules/history/components/prediction-card-b";
import PredictionStatsHeader from "@/src/modules/history/components/VirtualGrid/prediction-stats-header";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { Button } from "@/components/ui/button";
import LoaderStatic from "@/components/shared/loader-static";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import EmptyState from "@/components/shared/empty-state";
import { Lote } from "../interfaces";
import LoteSectionSkeleton from "../skeletons/lote-section-skeleton";
import ByLoteSkeleton from "../skeletons/by-lote-skeleton";

export default function ListByLote() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePredictionByLote();
  const gridRef = useRef<VirtuosoHandle>(null);
  const allLotes: Lote[] = data?.pages.flatMap((page) => page.content) ?? [];
  const loadMore = () => hasNextPage && !isFetchingNextPage && fetchNextPage();
  const handleScrollToTop = () => gridRef.current?.scrollToIndex({ index: 0 });

  if (isLoading) return <ByLoteSkeleton />;
  if (allLotes.length === 0) return <EmptyState message="No lotes found" />;

  return (
    <>
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

      <Virtuoso
        ref={gridRef}
        style={{ height: "90dvh" }}
        totalCount={allLotes.length}
        data={allLotes}
        itemContent={(idx, lote) => (
          <div className="mb-12">
            <LoteSection
              key={lote.serialNumber}
              data-idx={idx}
              id={lote.id}
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
        )}
        components={{
          Footer: () => {
            if (!hasNextPage || allLotes.length === 0 || isFetchingNextPage) {
              return null;
            }
            return <LoaderStatic label="Loading more..." />;
          },
          ScrollSeekPlaceholder: LoteSectionSkeleton,
        }}
        scrollSeekConfiguration={{
          enter: (velocity) => Math.abs(velocity) > 500,
          exit: (velocity) => Math.abs(velocity) < 50,
        }}
        endReached={loadMore}
      />
    </>
  );
}
