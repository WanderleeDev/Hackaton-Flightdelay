import { Metadata } from "next";
import PredictionSidebar from "@/src/modules/prediction/components/prediction-sidebar";
import GlobalMap from "@/src/modules/prediction/components/global-map";
import ListHistory from "@/src/modules/history/list-history";

export const metadata: Metadata = {
  title: "Search Engine | Flight Prediction",
  description: "Home page of Flight Search Engine.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-[.6fr_1fr] lg:grid-cols-[.7fr_1fr_.7fr] xl:grid-cols-[.5fr_1fr_.5fr] md:gap-2 overflow-x-hidden px-4 md:px-0 xl:px-4">
      <div className="order-2 md:order-1">
        <PredictionSidebar />
      </div>
      <div className="order-1 md:order-2">
        <GlobalMap />
      </div>
      <div className="hidden lg:block lg:order-3">
        <ListHistory />
      </div>
    </section>
  );
}
