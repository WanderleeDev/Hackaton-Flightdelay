"use client";

import { useInfinitePrediction } from "../hooks/useInfinitePrediction";
import PredictionCardB from "./prediction-card-b";
import LoaderObserver from "@/components/shared/loader-observer";

export default function ListPredictions() {
  const { data, fetchNextPage, hasNextPage } = useInfinitePrediction();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.pages.map((page) =>
          page.content.map((item) => (
            <PredictionCardB key={item.id} {...item} />
          )),
        )}
      </div>
      {hasNextPage && <LoaderObserver action={fetchNextPage} />}
    </div>
  );
}
