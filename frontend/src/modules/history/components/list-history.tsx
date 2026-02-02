"use client";

import { motion } from "motion/react";
import PredictionCardA from "./prediction-card-a";
import { match } from "ts-pattern";
import { useInfinitePrediction } from "../hooks/useInfinitePrediction";
import LoaderObserver from "@/src/modules/shared/components/loader-observer";
import EmptyState from "@/src/modules/shared/components/empty-state";

export default function ListHistory() {
  const { data, hasNextPage, fetchNextPage } = useInfinitePrediction();

  return (
    <div className="flex-1 overflow-y-auto space-y-3 w-full max-w-3xl mx-auto">
      {match(!data?.pages.length)
        .with(false, () =>
          data?.pages.map((page, idx) =>
            page.content?.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.21, 1.11, 0.81, 0.99],
                  delay: idx * 0.05,
                }}
              >
                <PredictionCardA {...item} />
              </motion.div>
            )),
          ),
        )
        .otherwise(() => (
          <EmptyState message="No predictions found" />
        ))}

      {hasNextPage && <LoaderObserver action={fetchNextPage} />}
    </div>
  );
}
