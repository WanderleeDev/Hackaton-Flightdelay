import { HelpTooltip } from "@/src/modules/shared/components/help-tooltip";
import { Prediction } from "@/src/modules/history/interfaces";
import PredictionCardWrapper from "@/src/modules/shared/components/prediction-card-wrapper";

interface ProbabilityDistributionProps {
  predictions: Prediction[];
}

export function ProbabilityDistribution({
  predictions,
}: ProbabilityDistributionProps) {
  // Calculate distribution
  const distribution = {
    low: predictions.filter((p) => p.delayProbability < 0.25).length,
    medium: predictions.filter(
      (p) => p.delayProbability >= 0.25 && p.delayProbability < 0.5,
    ).length,
    high: predictions.filter(
      (p) => p.delayProbability >= 0.5 && p.delayProbability < 0.75,
    ).length,
    veryHigh: predictions.filter((p) => p.delayProbability >= 0.75).length,
  };

  const maxCount = Math.max(
    distribution.low,
    distribution.medium,
    distribution.high,
    distribution.veryHigh,
  );

  const categories = [
    {
      label: "Low (0-25%)",
      count: distribution.low,
      color: "bg-green-500",
    },
    {
      label: "Medium (25-50%)",
      count: distribution.medium,
      color: "bg-yellow-500",
    },
    {
      label: "High (50-75%)",
      count: distribution.high,
      color: "bg-orange-500",
    },
    {
      label: "Very High (75-100%)",
      count: distribution.veryHigh,
      color: "bg-red-500",
    },
  ];

  return (
    <PredictionCardWrapper>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">
            Probability Distribution
          </h3>
          <HelpTooltip text="Distribution of flights by delay probability range" />
        </div>
        <div className="space-y-4">
          {categories.map((category) => {
            const heightPercent =
              maxCount > 0 ? (category.count / maxCount) * 100 : 0;

            return (
              <div key={category.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {category.label}
                  </span>
                  <span className="font-semibold">{category.count}</span>
                </div>
                <div className="h-8 bg-secondary rounded-md overflow-hidden">
                  <div
                    className={`h-full ${category.color} transition-all duration-500`}
                    style={{ width: `${heightPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PredictionCardWrapper>
  );
}
