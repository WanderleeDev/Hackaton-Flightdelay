import ListByLote from "@/src/modules/history/components/list-by-lote";
import { Metadata } from "next";
import ErrorSuspenseBoundary from "@/components/shared/error-suspense-boundary";
import ByLoteSkeleton from "@/src/modules/history/skeletons/by-lote-skeleton";

const TITLE = "History By Lote";
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
    <ErrorSuspenseBoundary fallback={<ByLoteSkeleton />}>
      <ListByLote />
    </ErrorSuspenseBoundary>
  );
}
