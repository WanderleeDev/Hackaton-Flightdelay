import { Prediction } from "@/src/modules/history/interfaces";
import { Layers, Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import { MetricCard } from "./metric-card";

interface LoteMetricsProps {
  predictions: Prediction[];
  totalPredictions: number;
}

export function LoteMetrics({
  predictions,
  totalPredictions,
}: LoteMetricsProps) {
  // Calculate metrics
  const loadedCount = predictions.length;
  const loadedPercentage = ((loadedCount / totalPredictions) * 100).toFixed(0);

  const avgProbability =
    predictions.reduce((sum, p) => sum + p.delayProbability, 0) /
    predictions.length;
  const avgProbabilityPercent = (avgProbability * 100).toFixed(1);

  const highRiskCount = predictions.filter(
    (p) => p.delayProbability > 0.5,
  ).length;

  const succeededCount = predictions.filter(
    (p) => p.status === "succeeded",
  ).length;
  const successRate = ((succeededCount / loadedCount) * 100).toFixed(0);

  const getRiskLevel = (prob: number) => {
    if (prob < 0.25) return "low risk";
    if (prob < 0.5) return "medium risk";
    if (prob < 0.75) return "high risk";
    return "very high risk";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={Layers}
        title="Total Loaded"
        value={`${loadedCount} of ${totalPredictions}`}
        subtitle={`${loadedPercentage}% loaded`}
      />
      <MetricCard
        icon={Target}
        title="Avg Probability"
        value={`${avgProbabilityPercent}%`}
        subtitle={getRiskLevel(avgProbability)}
      />
      <MetricCard
        icon={AlertTriangle}
        title="High Risk"
        value={highRiskCount}
        subtitle={`flights >50%`}
        iconClassName={highRiskCount > 0 ? "bg-destructive/10" : undefined}
      />
      <MetricCard
        icon={CheckCircle2}
        title="Success Rate"
        value={`${successRate}%`}
        subtitle={`${succeededCount}/${loadedCount} succeeded`}
        iconClassName="bg-green-500/10"
      />
    </div>
  );
}
