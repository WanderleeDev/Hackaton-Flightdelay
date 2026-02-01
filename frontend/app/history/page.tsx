import GradientOverlayCard from "@/src/modules/shared/components/gradient-overlay-card";
import { Metadata } from "next";
import ErrorSuspenseBoundary from "@/src/modules/shared/components/error-suspense-boundary";
import PredictionsSkeleton from "@/src/modules/history/skeletons/predictions-skeleton";
import ListPredictions from "@/src/modules/history/components/VirtualGrid";

const TITLE = "History";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: TITLE,
  description: "History of predictions.",
  alternates: {
    canonical: "/history",
  },
  openGraph: {
    title: TITLE,
  },
  twitter: {
    title: TITLE,
  },
};

export default function HistoryPage() {
  return (
    <GradientOverlayCard>
      <ErrorSuspenseBoundary fallback={<PredictionsSkeleton />}>
        <ListPredictions />
      </ErrorSuspenseBoundary>
    </GradientOverlayCard>
  );
}
