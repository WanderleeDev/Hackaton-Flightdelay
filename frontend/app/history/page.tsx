import {
  AtmosphericType,
  PredictionStatus,
} from "@/src/modules/history/interfaces";
import PredictionCardB from "@/src/modules/history/prediction-card-b";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
  description: "History of predictions.",
  alternates: {
    canonical: "/history",
  },
};

const HISTORY_DATA = [
  {
    id: "#PX-8842",
    status: "succeeded" as PredictionStatus,
    origin: "SKBO",
    destination: "KJFK",
    date: "2025-12-25",
    aircraft: "Airbus A320neo",
    distance: "4,012",
    atmospherics: "live" as AtmosphericType,
  },
  {
    id: "#PX-8841",
    status: "delayed" as PredictionStatus,
    origin: "EGLL",
    destination: "LEMD",
    date: "2025-12-24",
    aircraft: "Boeing 737-800",
    distance: "1,245",
    atmospherics: "storm" as AtmosphericType,
  },
  {
    id: "#PX-8840",
    status: "failed" as PredictionStatus,
    origin: "KMIA",
    destination: "TJSJ",
    date: "2025-12-23",
    aircraft: "Cessna Citation",
    distance: "1,680",
    atmospherics: "tailwind" as AtmosphericType,
  },
  {
    id: "#PX-8839",
    status: "succeeded" as PredictionStatus,
    origin: "VHHH",
    destination: "RJTT",
    date: "2025-11-22",
    aircraft: "Boeing 777-300ER",
    distance: "2,890",
    atmospherics: "none" as AtmosphericType,
  },
  {
    id: "#PX-8838",
    status: "failed" as PredictionStatus,
    origin: "VHHH",
    destination: "RJTT",
    date: "2025-11-22",
    aircraft: "Boeing 777-300ER",
    distance: "2,890",
    atmospherics: "none" as AtmosphericType,
  },
];

export default function HistoryPage() {
  return (
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 bg-card/40 rounded-[40px] border border-border p-8 md:p-12 overflow-hidden shadow-sm group">
      <div className="absolute inset-0 bg-linear-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none" />
      {HISTORY_DATA.map((item) => (
        <PredictionCardB key={item.id} {...item} />
      ))}
    </div>
  );
}
