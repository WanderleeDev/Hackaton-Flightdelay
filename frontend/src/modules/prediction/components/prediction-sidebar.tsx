"use client";

import { Plane, FileSpreadsheet, Sparkles } from "lucide-react";
import PredictForm from "./predict-form";
import CSVBatchPredictor from "./csv-batch-predictor";
import AccordionItem from "@/src/modules/shared/components/accordion-item";
import FeaturesSidebarCard from "@/src/modules/features/components/features-sidebar-card";

export default function PredictionSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <AccordionItem
        name="command"
        title="Manual Entry"
        subtitle="Single Prediction"
        icon={Plane}
        defaultOpen
      >
        <PredictForm />
      </AccordionItem>

      <AccordionItem
        name="command"
        title="Bulk Process"
        subtitle="CSV Batch Upload"
        icon={FileSpreadsheet}
      >
        <CSVBatchPredictor />
      </AccordionItem>

      <AccordionItem
        name="command"
        title="Explore"
        subtitle="Platform Core Features"
        icon={Sparkles}
      >
        <FeaturesSidebarCard />
      </AccordionItem>
    </div>
  );
}
