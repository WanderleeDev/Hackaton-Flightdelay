"use client";

import { motion } from "motion/react";
import PredictionCardA from "./prediction-card-a";
import { useInfinitePrediction } from "../hooks/useInfinitePrediction";
import LoaderObserver from "@/src/modules/shared/components/loader-observer";
import EmptyState from "@/src/modules/shared/components/empty-state";
import { Virtuoso } from "react-virtuoso";

export default function ListHistory() {
  const { data, hasNextPage, fetchNextPage } = useInfinitePrediction();

  const allItems = data?.pages.flatMap((page) => page.content ?? []) ?? [];

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto h-full min-h-0">
      <Virtuoso
        style={{ height: "100%" }}
        className="mask-[linear-gradient(to_bottom,black_calc(100%-40px),transparent)]"
        data={allItems}
        endReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        itemContent={(index, item) => (
          <div className="pb-3 px-1">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.21, 1.11, 0.81, 0.99],
                delay: Math.min(index, 8) * 0.05,
              }}
            >
              <PredictionCardA {...item} />
            </motion.div>
          </div>
        )}
        components={{
          EmptyPlaceholder: () => <EmptyState message="No predictions found" />,
          Footer: () =>
            hasNextPage ? (
              <div className="py-4 flex justify-center">
                <LoaderObserver action={fetchNextPage} />
              </div>
            ) : (
              <div className="h-4" />
            ),
        }}
      />
    </div>
  );
}
