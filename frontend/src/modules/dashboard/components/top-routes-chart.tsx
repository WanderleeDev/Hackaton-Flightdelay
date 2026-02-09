import { Prediction } from "@/src/modules/history/interfaces";
import { transformToTopRoutes } from "../transformers/top-routes-transformer";
import MetricBar from "./metric-bar";

interface TopRoutesChartProps {
  predictions: Prediction[];
}

export function TopRoutesChart({ predictions }: TopRoutesChartProps) {
  const topRoutes = transformToTopRoutes(predictions);
  return (
    <div className="p-6">
      <div className="space-y-4">
        {topRoutes.map((route) => (
          <MetricBar
            key={route.route}
            label={route.route}
            count={`${route.avgPercentage.toFixed(1)}%`}
            percentage={route.avgPercentage}
          />
        ))}
      </div>
    </div>
  );
}
