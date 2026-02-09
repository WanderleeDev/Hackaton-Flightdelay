import { Prediction } from "@/src/modules/history/interfaces";
import MetricBar from "./metric-bar";
import { transformToDistribution } from "../transformers/distribution-transformer";

interface ProbabilityDistributionProps {
  predictions: Prediction[];
}

export function ProbabilityDistribution({
  predictions,
}: ProbabilityDistributionProps) {
  const distribution = transformToDistribution(
    predictions.map((p) => p.delayProbability),
  );

  return (
    <div className="p-6">
      <div className="space-y-4">
        {distribution.map(({ color, label, value }) => {
          return (
            <MetricBar
              key={label}
              label={label}
              count={`${value} ${value === 1 ? "flight" : "flights"}`}
              color={color}
              percentage={value}
            />
          );
        })}
      </div>
    </div>
  );
}
