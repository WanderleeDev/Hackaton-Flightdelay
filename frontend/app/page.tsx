import { Metadata } from "next";
import PredictionSidebar from "@/src/modules/prediction/components/prediction-sidebar";
import GlobalMap from "@/src/modules/prediction/components/global-map";
import RecentPredictions from "@/src/modules/history/components/recent-predictions";

const TITLE = "Flight Prediction";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: TITLE,
  description: "Advanced AI-powered flight prediction engine.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
  },
  twitter: {
    title: TITLE,
  },
};

import { MapProvider } from "@/src/modules/prediction/context/map-context";

export default function Home() {
  return (
    <MapProvider>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-[.6fr_1fr] lg:grid-cols-[.7fr_1fr_.7fr] xl:grid-cols-[.5fr_1fr_.5fr] md:gap-2 px-4 md:px-0 xl:px-4 overflow-x-hidden md:overflow-x-visible">
        <div className="order-2 md:order-1">
          <PredictionSidebar />
        </div>
        <div className="order-1 md:order-2">
          <GlobalMap className="md:sticky md:top-16" />
        </div>
        <div className="hidden lg:block lg:order-3">
          <RecentPredictions className="md:sticky md:top-16" />
        </div>
      </section>
    </MapProvider>
  );
}
