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
import { cn } from "@/src/lib/utils";
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
        className="sm:max-w-md bg-stone-950 border-stone-800 text-stone-100 overflow-hidden p-0"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br",
            isDelayed
              ? "from-red-500 to-transparent"
              : "from-emerald-500 to-transparent",
          )}
        />

        <DialogHeader className="p-6 pb-2 border-b border-stone-800/50 bg-stone-900/50 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Flight Analysis
            </DialogTitle>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5",
                isDelayed
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
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
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-stone-900/40 border border-stone-800/50">
            <div className="relative mb-4">
              <div
                className={cn(
                  "size-24 rounded-full flex items-center justify-center",
                  isDelayed
                    ? "bg-red-500/10 text-red-500"
                    : "bg-emerald-500/10 text-emerald-500",
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
                  "absolute -top-1 -right-1 size-8 rounded-full border-4 border-stone-950 flex items-center justify-center text-[10px] font-bold",
                  isDelayed
                    ? "bg-red-500 text-white"
                    : "bg-emerald-500 text-white",
                )}
              >
                {probability}%
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-1">
                {isDelayed ? "Delayed Risk" : "On Time Status"}
              </h3>
              <p className="text-stone-400 text-sm max-w-[200px]">
                Probability of delay based on current parameters.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                  Origin
                </span>
                <span className="text-lg font-bold">{formData.origin}</span>
              </div>
              <div className="flex flex-col items-center">
                <Plane className="size-4 text-stone-600 rotate-90" />
                <div className="w-16 h-px bg-stone-800 my-2" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                  Destination
                </span>
                <span className="text-lg font-bold">
                  {formData.destination}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/50 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-stone-800 text-stone-400">
                  <CalendarIcon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 font-bold">
                    DATE
                  </span>
                  <span className="text-xs font-semibold">
                    {format(formData.departureDate, "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/50 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-stone-800 text-stone-400">
                  <AtmosphericIcon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 font-bold">
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

        <div className="p-6 bg-stone-900/50 border-t border-stone-800/50 flex flex-col gap-2">
          <Button
            className="w-full bg-stone-100 text-stone-900 hover:bg-white font-bold"
            onClick={() => onOpenChange(false)}
          >
            New Prediction
          </Button>
          <p className="text-center text-[10px] text-stone-500 px-4">
            Internal evaluation system. Results are probabilistic based on
            historical patterns.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
