"use client";

import { Inbox } from "lucide-react";
import { motion } from "motion/react";
import PredictionCardA from "./prediction-card-a";
import { match } from "ts-pattern";
import { useInfinitePrediction } from "../hooks/useInfinitePrediction";
import LoaderObserver from "@/components/shared/loader-observer";
import EmptyState from "@/components/shared/empty-state";

export default function ListHistory() {
  const { data, hasNextPage, fetchNextPage } = useInfinitePrediction();

  return (
    <div className="flex-1 overflow-y-auto space-y-3  p-2 w-full rounded-md gap-2 border max-w-3xl mx-auto">
      {match(!data?.pages.length)
        .with(false, () =>
          data?.pages.map((page, idx) =>
            page.content?.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
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
