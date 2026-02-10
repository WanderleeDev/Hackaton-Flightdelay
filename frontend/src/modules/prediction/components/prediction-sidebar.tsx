import { Plane, FileSpreadsheet, Sparkles } from "lucide-react";
import PredictForm from "./predict-form";
import CSVBatchPredictor from "./csv-batch-predictor";
import AccordionItem from "@/src/modules/shared/components/accordion-item";
import FeaturesSidebarCard from "@/src/modules/features/components/features-sidebar-card";
import SectionHeader from "@/src/modules/shared/components/section-header";

export default function PredictionSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        className=""
        title="Flight"
        accentText="Analysis"
        label="Configure and run predictions."
        size="sm"
        icon={<Sparkles className="size-5 text-primary" />}
      />
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
