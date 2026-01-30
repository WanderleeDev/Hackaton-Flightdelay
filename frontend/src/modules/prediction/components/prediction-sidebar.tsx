"use client";

import { ChevronDown, Plane, FileSpreadsheet, Sparkles } from "lucide-react";
import PredictForm from "./predict-form";
import CSVBatchPredictor from "./csv-batch-predictor";
import Image from "next/image";
import Link from "next/link";

export default function PredictionSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <details
        name="command"
        className="group border border-border/50 rounded-[32px] overflow-hidden bg-card/20 backdrop-blur-sm"
        open
      >
        <summary className="flex items-center justify-between gap-2 p-4 md:p-6 cursor-pointer list-none hover:bg-secondary/20 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Plane className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Manual Entry
              </span>
              <span className="text-sm font-bold tracking-tight">
                Single Prediction
              </span>
            </div>
          </div>
          <ChevronDown className="size-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
        </summary>
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <PredictForm />
        </div>
      </details>

      <details
        name="command"
        className="group border border-border/50 rounded-[32px] overflow-hidden bg-card/20 backdrop-blur-sm"
      >
        <summary className="flex items-center justify-between gap-2 p-4 md:p-6 cursor-pointer list-none hover:bg-secondary/20 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <FileSpreadsheet className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Bulk Process
              </span>
              <span className="text-sm font-bold tracking-tight">
                CSV Batch Upload
              </span>
            </div>
          </div>
          <ChevronDown className="size-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
        </summary>
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <CSVBatchPredictor />
        </div>
      </details>

      <details
        name="command"
        className="group border border-border/50 rounded-[32px] overflow-hidden bg-card/20 backdrop-blur-sm"
      >
        <summary className="flex items-center justify-between gap-2 p-4 md:p-6 cursor-pointer list-none hover:bg-secondary/20 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Sparkles className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Explore
              </span>
              <span className="text-sm font-bold tracking-tight">
                Platform Core Features
              </span>
            </div>
          </div>
          <ChevronDown className="size-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
        </summary>
        <div className="p-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/50 mb-4 shadow-sm bg-black/20">
            <Image
              src="/app-features-logo-base.png"
              alt="AI Core Engine"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/10 to-transparent flex items-end p-4">
              <p className="text-xs font-semibold text-foreground leading-tight">
                Driven by our advanced AI core engine for high-precision flight
                forecasting.
              </p>
            </div>
          </div>
          <Link href="/features" className="block">
            <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              Explore Our Features
            </button>
          </Link>
        </div>
      </details>
    </div>
  );
}
