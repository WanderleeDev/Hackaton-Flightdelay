import { getLoteDetailId } from "@/src/modules/dashboard/services/getLoteDetailId";
import { LoteMetrics } from "@/src/modules/dashboard/components/lote-metrics";
import { ProbabilityDistribution } from "@/src/modules/dashboard/components/probability-distribution";
import { TopRoutesChart } from "@/src/modules/dashboard/components/top-routes-chart";
import { LotePredictionsTable } from "@/src/modules/dashboard/components/lote-detail-content";
import { ArrowLeft, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeaderB from "@/src/modules/shared/components/section-header-b";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ByLoteIdPage({ params }: Props) {
  const { id } = await params;
  const lote = await getLoteDetailId({ idLote: id, size: 100 });
  const predictions = lote.histories.content;

  return (
    <div className="space-y-6">
      <SectionHeaderB
        title={lote.batchName}
        serialNumber={lote.serialNumber}
        date={lote.createdAt}
        simulationsCount={lote.histories.totalElements}
        icon={Database}
      >
        <Link href="/history/byLote" className="ml-auto">
          <Button
            variant="secondary"
            className="h-10 px-4 rounded-xl flex items-center gap-2 text-xs font-bold border border-border"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Batches</span>
          </Button>
        </Link>
      </SectionHeaderB>

      <LoteMetrics predictions={predictions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProbabilityDistribution predictions={predictions} />
        <TopRoutesChart predictions={predictions} />
      </div>

      <LotePredictionsTable predictions={predictions} />
    </div>
  );
}
