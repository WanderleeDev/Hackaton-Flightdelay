import {
  Calendar,
  Plane,
  Route,
  CloudRain,
  CloudLightning,
  Wind,
  Armchair,
  CircleOff,
  Percent,
} from "lucide-react";
import { cn } from "@/src/utils/cn";
import { formatDelayProbability } from "@/src/utils/formatDelayProbability";
import { Prediction } from "../interfaces";
import { format } from "date-fns";
import { HTMLAttributes } from "react";
import PredictionCardWrapper from "../../shared/components/prediction-card-wrapper";

export type PredictionStatus = "succeeded" | "delayed" | "failed";
export type AtmosphericType = "live" | "storm" | "tailwind" | "none";

type HistoryCardProps = HTMLAttributes<HTMLDivElement> & Prediction;

const statusConfig = {
  succeeded: {
    label: "SUCCEEDED",
    bg: "bg-primary/10",
    text: "text-primary",
    planeColor: "text-primary",
  },
  delayed: {
    label: "DELAYED",
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    planeColor: "text-amber-500",
  },
  failed: {
    label: "FAILED",
    bg: "bg-destructive/10",
    text: "text-destructive",
    planeColor: "text-destructive",
  },
};

const atmosphericConfig = {
  live: { label: "Live", icon: CloudRain },
  storm: { label: "Storm", icon: CloudLightning },
  tailwind: { label: "Tailwind", icon: Wind },
  none: { label: "N/A", icon: CircleOff },
};

export default function PredictionCardB({
  id,
  status,
  origin,
  destination,
  airline,
  delayProbability,
  departureDate,
  distanceKm,
  atmospherics,
  ...props
}: HistoryCardProps) {
  const config = statusConfig[status];
  const atmospheric = atmosphericConfig[atmospherics ?? "none"];
  const WeatherIcon = atmospheric.icon;

  return (
    <PredictionCardWrapper className="p-4 sm:p-6 overflow-hidden" {...props}>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <span
          className={cn(
            "px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider",
            config.bg,
            config.text,
          )}
        >
          {config.label}
        </span>
        <span className="text-gray-500 text-[10px] sm:text-xs font-mono">
          #{id.slice(0, 8)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex flex-col min-w-0">
          <span className="text-gray-500 text-[9px] sm:text-[10px] font-bold uppercase mb-1">
            From
          </span>
          <span className="text-foreground text-xl sm:text-2xl font-bold tracking-tight truncate">
            {origin}
          </span>
        </div>

        <div className="flex-1 flex items-center gap-1 sm:gap-2 mb-[-8px] sm:mb-[-12px]">
          <div className="h-[1px] sm:h-[2px] flex-1 border-b border-dashed border-border/50"></div>
          <Plane
            className={cn("size-4 sm:size-5 shrink-0", config.planeColor)}
          />
          <div className="h-[1px] sm:h-[2px] flex-1 border-b border-dashed border-border/50"></div>
        </div>

        <div className="flex flex-col items-end text-right min-w-0">
          <span className="text-muted-foreground text-[9px] sm:text-[10px] font-bold uppercase mb-1">
            To
          </span>
          <span className="text-foreground text-xl sm:text-2xl font-bold tracking-tight truncate">
            {destination}
          </span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground min-w-0">
            <Calendar className="size-3.5 sm:size-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium truncate">
              Departure Date
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground whitespace-nowrap">
            {format(departureDate, "yyyy-MM-dd")}
          </span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground min-w-0">
            <Armchair className="size-3.5 sm:size-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium truncate">
              Aircraft
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground truncate max-w-[120px]">
            {airline}
          </span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground min-w-0">
            <Percent className="size-3.5 sm:size-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium truncate">
              Delay Prob.
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground">
            {formatDelayProbability(delayProbability)}
          </span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground min-w-0">
            <Route className="size-3.5 sm:size-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium truncate">
              Distance
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground whitespace-nowrap">
            {distanceKm} km
          </span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground min-w-0">
            <WeatherIcon className="size-3.5 sm:size-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium truncate">
              Atmospherics
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground">
            {atmospheric.label}
          </span>
        </div>
      </div>
    </PredictionCardWrapper>
  );
}
