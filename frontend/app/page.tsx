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
      <section className="grid grid-cols-1 md:grid-cols-[.6fr_1fr] lg:grid-cols-[.7fr_1fr_.7fr] xl:grid-cols-[.5fr_1fr_.5fr] overflow-x-hidden md:overflow-x-visible min-h-screen">
        <div className="order-2 md:order-1 bg-secondary/15 dark:bg-secondary/5 px-4 py-8 md:px-6 md:border-r border-border/40">
          <PredictionSidebar />
        </div>
        <div className="order-1 md:order-2 px-4 md:pt-8">
          <GlobalMap className="md:sticky md:top-20" />
        </div>
        <div className="hidden lg:block lg:order-3 bg-secondary/15 dark:bg-secondary/5 px-4 py-8 md:px-6 border-l border-border/40">
          <RecentPredictions className="md:sticky md:top-20" />
        </div>
      </section>
    </MapProvider>
  );
}
