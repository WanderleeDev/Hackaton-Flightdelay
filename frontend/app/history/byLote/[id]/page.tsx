import { Metadata } from "next";
import { Suspense } from "react";
import LoteDetailSkeleton from "@/src/modules/history/skeletons/lote-detail-skeleton";
import ErrorSuspenseBoundary from "@/components/shared/error-suspense-boundary";
import { LoteDetailContent } from "./components/lote-detail-content";
import { Lote, Pagination } from "@/src/modules/history/interfaces";
import { getPredictionsByLoteId } from "@/src/modules/history/services/getPredictionsByLoteId";

export const dynamic = "force-dynamic";

const mock: Pagination<Lote> = {
  content: [
    {
      id: "lote-123",
      batchName: "Morning Flights Batch",
      serialNumber: 1001,
      total: 5,
      createdAt: "2026-01-28T10:30:00Z",
      histories: [
        {
          id: "pred-001",
          status: "delayed",
          origin: "JFK",
          destination: "LAX",
          departureDate: "2026-02-15T08:00:00Z",
          airline: "American Airlines",
          distanceKm: "3974",
          delayProbability: 0.78,
          atmospherics: "storm",
        },
        {
          id: "pred-002",
          status: "succeeded",
          origin: "ORD",
          destination: "MIA",
          departureDate: "2026-02-15T09:30:00Z",
          airline: "United Airlines",
          distanceKm: "1883",
          delayProbability: 0.15,
          atmospherics: "none",
        },
        {
          id: "pred-003",
          status: "delayed",
          origin: "ATL",
          destination: "SEA",
          departureDate: "2026-02-15T11:00:00Z",
          airline: "Delta Air Lines",
          distanceKm: "3542",
          delayProbability: 0.65,
          atmospherics: "tailwind",
        },
        {
          id: "pred-004",
          status: "succeeded",
          origin: "DFW",
          destination: "BOS",
          departureDate: "2026-02-15T12:15:00Z",
          airline: "Southwest Airlines",
          distanceKm: "2555",
          delayProbability: 0.22,
          atmospherics: "live",
        },
        {
          id: "pred-005",
          status: "failed",
          origin: "SFO",
          destination: "JFK",
          departureDate: "2026-02-15T14:00:00Z",
          airline: "JetBlue Airways",
          distanceKm: "4139",
          delayProbability: 0.92,
          atmospherics: "storm",
        },
      ],
    },
  ],
  pageNumber: 0,
  pageSize: 100,
  totalElements: 1,
  totalPages: 1,
  last: true,
  first: true,
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ByLoteIdPage({ params }: Props) {
  const { id } = await params;
  const predictions = await getPredictionsByLoteId({ idLote: id, size: 100 });

  return (
    <ErrorSuspenseBoundary fallback={<LoteDetailSkeleton />}>
      <Suspense fallback={<LoteDetailSkeleton />}>
        <LoteDetailContent lote={mock} />
      </Suspense>
    </ErrorSuspenseBoundary>
  );
}
