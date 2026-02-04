import { Metadata } from "next";
import ErrorSuspenseBoundary from "@/src/modules/shared/components/error-suspense-boundary";
import ByLoteSkeleton from "@/src/modules/history/skeletons/by-lote-skeleton";
import ListByLote from "@/src/modules/history/components/list-by-lote";
import GradientOverlayCard from "@/src/modules/shared/components/gradient-overlay-card";

const TITLE = "History By Lote";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: TITLE,
  description: "History of predictions by lote.",
  alternates: {
    canonical: "/history/byLote",
  },
  openGraph: {
    title: TITLE,
  },
  twitter: {
    title: TITLE,
  },
};

export default function ByLotePage() {
  return (
    <GradientOverlayCard>
      <ErrorSuspenseBoundary fallback={<ByLoteSkeleton />}>
        <ListByLote />
      </ErrorSuspenseBoundary>
    </GradientOverlayCard>
  );
}
