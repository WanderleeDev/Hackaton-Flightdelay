"use client";

import { Inbox } from "lucide-react";
import { motion } from "motion/react";
import PredictionCardA from "./prediction-card-a";
import { match } from "ts-pattern";
import { useHistoryPredictions } from "./hooks/useHistoryPredictions";

export default function ListHistory() {
  const { data } = useHistoryPredictions();

  return (
    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar  p-2 w-full rounded-md gap-2 border max-w-3xl mx-auto">
      {match(data && !data.length)
        .with(false, () =>
          data?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <PredictionCardA {...item} />
            </motion.div>
          )),
        )
        .otherwise(() => (
          <div className="flex flex-col items-center justify-center py-12 text-center h-full">
            <Inbox className="mb-4 size-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No predictions found
            </p>
          </div>
        ))}
    </div>
  );
}
