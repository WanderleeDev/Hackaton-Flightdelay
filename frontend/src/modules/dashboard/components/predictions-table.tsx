import { Badge } from "@/components/ui/badge";
import { Prediction } from "@/src/modules/history/interfaces";
import { CheckCircle2, XCircle, Plane } from "lucide-react";
import { cn } from "@/src/utils/cn";

interface PredictionsTableProps {
  predictions: Prediction[];
}

export function PredictionsTable({ predictions }: PredictionsTableProps) {
  const getProbabilityColor = (probability: number) => {
    if (probability < 0.25)
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    if (probability < 0.5)
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    if (probability < 0.75)
      return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
    return "bg-red-500/10 text-red-700 dark:text-red-400";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDistance = (distance: string | number) => {
    const dist = typeof distance === "string" ? parseFloat(distance) : distance;
    return dist.toLocaleString();
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Route
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Airline
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Departure
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Distance
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Probability
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction, index) => (
              <tr
                key={prediction.id}
                className={cn(
                  "border-b last:border-0 hover:bg-muted/50 transition-colors",
                  index % 2 === 0 ? "bg-background" : "bg-muted/20",
                )}
              >
                {/* Route */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-medium">
                    <Plane className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {prediction.origin} → {prediction.destination}
                    </span>
                  </div>
                </td>

                {/* Airline */}
                <td className="px-4 py-3">
                  <Badge variant="outline">{prediction.airline}</Badge>
                </td>

                {/* Departure */}
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDate(prediction.departureDate)}
                </td>

                {/* Distance */}
                <td className="px-4 py-3 text-sm">
                  {formatDistance(prediction.distanceKm)} km
                </td>

                {/* Probability */}
                <td className="px-4 py-3">
                  <Badge
                    className={cn(
                      "font-semibold",
                      getProbabilityColor(prediction.delayProbability),
                    )}
                  >
                    {(prediction.delayProbability * 100).toFixed(1)}%
                  </Badge>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  {prediction.status === "succeeded" ? (
                    <Badge
                      variant="outline"
                      className="gap-1 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Succeeded
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="gap-1 bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                    >
                      <XCircle className="h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
