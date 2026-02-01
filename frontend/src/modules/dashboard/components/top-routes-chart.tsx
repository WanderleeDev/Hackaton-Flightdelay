import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpTooltip } from "@/src/modules/shared/components/help-tooltip";
import { Prediction } from "@/src/modules/history/interfaces";

interface TopRoutesChartProps {
  predictions: Prediction[];
}

export function TopRoutesChart({ predictions }: TopRoutesChartProps) {
  // Group by route and calculate average probability
  const routeMap = new Map<
    string,
    { route: string; totalProb: number; count: number }
  >();

  predictions.forEach((p) => {
    const route = `${p.origin} → ${p.destination}`;
    const existing = routeMap.get(route);

    if (existing) {
      existing.totalProb += p.delayProbability;
      existing.count += 1;
    } else {
      routeMap.set(route, {
        route,
        totalProb: p.delayProbability,
        count: 1,
      });
    }
  });

  // Calculate averages and sort
  const routes = Array.from(routeMap.values())
    .map((r) => ({
      route: r.route,
      avgProbability: r.totalProb / r.count,
    }))
    .sort((a, b) => b.avgProbability - a.avgProbability)
    .slice(0, 5); // Top 5

  const maxProb = Math.max(...routes.map((r) => r.avgProbability));

  const getColorClass = (prob: number) => {
    if (prob < 0.25) return "bg-green-500";
    if (prob < 0.5) return "bg-yellow-500";
    if (prob < 0.75) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Routes by Probability</CardTitle>
          <HelpTooltip text="Top 5 routes with highest average delay probability" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {routes.map((route) => {
            const widthPercent = (route.avgProbability / maxProb) * 100;
            const probabilityPercent = (route.avgProbability * 100).toFixed(1);

            return (
              <div key={route.route} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{route.route}</span>
                  <span className="text-muted-foreground">
                    {probabilityPercent}%
                  </span>
                </div>
                <div className="h-8 bg-secondary rounded-md overflow-hidden">
                  <div
                    className={`h-full ${getColorClass(route.avgProbability)} transition-all duration-500`}
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
