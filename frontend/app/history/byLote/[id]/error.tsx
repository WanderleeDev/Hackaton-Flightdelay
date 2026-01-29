"use client";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ErrorByLoteId({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative flex flex-col items-center max-w-md w-full px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-destructive/10 blur-[80px] rounded-full" />

        <div className="relative mb-8">
          <div className="bg-destructive/10 p-4 rounded-2xl border border-destructive/20 animate-pulse">
            <AlertCircle className="size-12 text-destructive" />
          </div>
        </div>

        <div className="space-y-4 mb-10 relative">
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            Oops! Error Loading Data
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We couldn't retrieve the details for this prediction batch. The ID
            might be invalid or there might be a temporary technical issue.
          </p>
          <div className="p-3 rounded-lg bg-muted/50 border border-border text-[10px] font-mono text-muted-foreground break-all">
            Error: {error.message || "An unexpected error occurred"}
            {error.digest && (
              <div className="mt-1 opacity-50">ID: {error.digest}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full relative">
          <Button
            variant="default"
            className="w-full sm:flex-1 h-11 gap-2 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            onClick={() => reset()}
          >
            <RefreshCcw className="size-4" />
            Retry
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full sm:flex-1 h-11 gap-2 font-bold transition-all hover:bg-accent/50"
          >
            <Link href="/history">
              <ChevronLeft className="size-4" />
              Go to History
            </Link>
          </Button>
        </div>

        <div className="mt-12 opacity-40 hover:opacity-100 transition-opacity">
          <BrandLogo />
        </div>
      </div>
    </div>
  );
}
