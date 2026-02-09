import { Prediction } from "../../history/interfaces";

interface TopRoute {
  route: string;
  avgPercentage: number;
}

export function transformToTopRoutes(
  predictions: Prediction[],
  top: number = 5,
): TopRoute[] {
  const topRoutes = predictions.sort(
    (a, b) => b.delayProbability - a.delayProbability,
  );

  return topRoutes
    .map((r) => ({
      route: `${r.origin} → ${r.destination}`,
      avgPercentage: r.delayProbability * 100,
    }))
    .slice(0, top);
}
