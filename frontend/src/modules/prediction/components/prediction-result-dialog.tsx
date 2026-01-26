"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PredictionResponse } from "../hooks/useprediction";
import { Schema } from "../schemas/form.schema";
import {
  Plane,
  AlertCircle,
  CheckCircle2,
  Calendar as CalendarIcon,
  TrendingDown,
  TrendingUp,
  Wind,
  CloudRain,
  CloudLightning,
  CircleSlash2,
} from "lucide-react";
import { cn } from "@/src/modules/shared/utils/cn";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface PredictionResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: PredictionResponse | null;
  formData: Schema | null;
}

export default function PredictionResultDialog({
  open,
  onOpenChange,
  result,
  formData,
}: PredictionResultDialogProps) {
  if (!result || !formData) return null;

  const isDelayed = result.delay_prediction === 1;
  const probability = (result.delay_probability * 100).toFixed(1);

  const getAtmosphericIcon = (type: string) => {
    switch (type) {
      case "live":
        return CloudRain;
      case "storm":
        return CloudLightning;
      case "tailwind":
        return Wind;
      default:
        return CircleSlash2;
    }
  };

  const AtmosphericIcon = getAtmosphericIcon(formData.atmospherics);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="sm:max-w-md bg-background border-border text-foreground overflow-hidden p-0 shadow-2xl"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br",
            isDelayed
              ? "from-destructive/20 to-transparent"
              : "from-primary/20 to-transparent",
          )}
        />

        <DialogHeader className="p-6 pb-2 border-b border-border/50 bg-card/50 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Flight Analysis
            </DialogTitle>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5",
                isDelayed
                  ? "bg-destructive/10 text-destructive border border-destructive/20"
                  : "bg-primary/10 text-primary border border-primary/20",
              )}
            >
              {isDelayed ? (
                <AlertCircle className="size-3" />
              ) : (
                <CheckCircle2 className="size-3" />
              )}
              {isDelayed ? "Potential Delay" : "Likely On Time"}
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6 relative z-10">
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-card/40 border border-border/50">
            <div className="relative mb-4">
              <div
                className={cn(
                  "size-24 rounded-full flex items-center justify-center",
                  isDelayed
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary",
                )}
              >
                {isDelayed ? (
                  <TrendingUp className="size-12 animate-pulse" />
                ) : (
                  <TrendingDown className="size-12" />
                )}
              </div>
              <div
                className={cn(
                  "absolute -top-1 -right-1 size-8 rounded-full border-4 border-background flex items-center justify-center text-[10px] font-bold",
                  isDelayed
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                {probability}%
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-1">
                {isDelayed ? "Delayed Risk" : "On Time Status"}
              </h3>
              <p className="text-muted-foreground text-sm max-w-[200px]">
                Probability of delay based on current parameters.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Origin
                </span>
                <span className="text-lg font-bold">{formData.origin}</span>
              </div>
              <div className="flex flex-col items-center">
                <Plane className="size-4 text-muted-foreground rotate-90" />
                <div className="w-16 h-px bg-border my-2" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Destination
                </span>
                <span className="text-lg font-bold">
                  {formData.destination}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-card/40 border border-border/50 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                  <CalendarIcon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold">
                    DATE
                  </span>
                  <span className="text-xs font-semibold">
                    {format(formData.departureDate, "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-card/40 border border-border/50 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                  <AtmosphericIcon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold">
                    WEATHER
                  </span>
                  <span className="text-xs font-semibold capitalize">
                    {formData.atmospherics}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card/50 border-t border-border/50 flex flex-col gap-2">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            onClick={() => onOpenChange(false)}
          >
            New Prediction
          </Button>
          <p className="text-center text-[10px] text-muted-foreground px-4">
            Internal evaluation system. Results are probabilistic based on
            historical patterns.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
