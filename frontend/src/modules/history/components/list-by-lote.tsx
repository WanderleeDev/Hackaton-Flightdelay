"use client";

import { useInfinitePredictionByLote } from "@/src/modules/history/hooks/useInfinitePredictionByLote";
import LoteSection from "@/src/modules/history/components/lote-section";
import PredictionCardB from "@/src/modules/history/components/prediction-card-b";
import LoaderObserver from "@/components/shared/loader-observer";

export default function ListByLote() {
  const { data, fetchNextPage, hasNextPage } = useInfinitePredictionByLote();

  return (
    <div className="flex flex-col gap-8 relative z-10">
      {data?.pages.map((page) =>
        page.content.map((lote) => (
          <LoteSection
            key={lote.id}
            date={lote.createdAt}
            title={lote.batchName}
            simulationsCount={lote.total}
          >
            {lote.histories.map((prediction) => (
              <PredictionCardB key={prediction.id} {...prediction} />
            ))}
          </LoteSection>
        )),
      )}
      {hasNextPage && <LoaderObserver action={fetchNextPage} />}
    </div>
  );
}
