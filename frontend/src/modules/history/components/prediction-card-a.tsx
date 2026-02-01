import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Clock, PlaneTakeoff, PlaneLanding, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Prediction } from "../interfaces";
import { formatDelayProbability } from "@/src/utils/formatDelayProbability";

type PredictionCardAProps = Prediction;

export default function PredictionCardA({
  origin,
  destination,
  status,
  departureDate,
  delayProbability,
}: PredictionCardAProps) {
  return (
    <Card className="overflow-hidden border-muted/50 hover:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-md min-w-0">
      <CardContent className="p-4 @container">
        <div className="flex justify-between items-center mb-4 gap-2">
          <Badge
            variant={status === "delayed" ? "destructive" : "secondary"}
            className="font-medium px-2 py-0.5 text-xs whitespace-nowrap"
          >
            {status.toUpperCase()} -{" "}
            <span className="font-bold">
              {formatDelayProbability(delayProbability)}
            </span>
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium whitespace-nowrap @min-[200px]:block">
            <Clock className="size-3.5 shrink-0" />
            {format(departureDate, "HH:mm")}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-full bg-primary/10 shrink-0">
                <PlaneTakeoff className="size-3.5 text-primary" />
              </div>
              <span className="font-bold text-base truncate hidden @min-[200px]:block">
                {origin}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider ml-1 whitespace-nowrap @max-sm:pt-2">
              Departure
            </span>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-1 px-2 sm:px-4">
            <div className="w-12 sm:w-16 h-px bg-linear-to-r from-transparent via-muted-foreground/30 to-transparent relative">
              <PlaneTakeoff className="size-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/40 rotate-90" />
            </div>
            <span className="text-[10px] text-muted-foreground/40 font-medium italic whitespace-nowrap hidden sm:block">
              Flight Path
            </span>
          </div>

          <div className="flex flex-col gap-1 items-end min-w-0 text-right flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-base truncate hidden @min-[200px]:block">
                {destination}
              </span>
              <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                <PlaneLanding className="size-3.5 text-primary" />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mr-1 whitespace-nowrap @max-sm:mt-2">
              Arrival
            </span>
          </div>
        </div>

        <Separator className="my-4 opacity-50" />

        <div className="flex justify-between items-center text-[10px] text-muted-foreground/60 font-medium gap-2">
          <div className="flex items-center gap-1 min-w-0">
            <MapPin className="size-3 flex-shrink-0" />
            <span className="truncate">Trans-Atlantic Route</span>
          </div>
          <span className="whitespace-nowrap">
            {format(departureDate, "MMM dd, yyyy")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
