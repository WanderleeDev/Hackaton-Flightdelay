"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, RefreshCcw, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-20 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 opacity-30 select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] border border-primary/10 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[850px] sm:h-[850px] border border-primary/5 rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        <div className="relative mb-10">
          <div className="bg-card/50 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl shadow-primary/5">
            <Image
              src="/logo.webp"
              alt="Flight Prediction Logo"
              width={140}
              height={140}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              priority
            />
          </div>

          <div className="absolute -bottom-4 -right-4 bg-primary px-4 py-2 rounded-xl shadow-xl border-4 border-background rotate-12">
            <span className="text-white text-xl font-bold italic tracking-tighter">
              404
            </span>
          </div>
        </div>

        <div className="space-y-6 px-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.1]">
            Signal <span className="text-primary italic">Lost</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-medium max-w-lg mx-auto">
            The requested resource is off our radar. It might have been moved,
            decommissioned, or renamed.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto font-bold uppercase tracking-widest px-8 group transition-transform active:scale-95"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Terminal
              <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto font-bold uppercase tracking-widest px-8 bg-background/50 backdrop-blur-md transition-transform active:scale-95"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry Scan
          </Button>
        </div>
      </div>

      <div
        className="absolute inset-0 -z-20 opacity-[0.03] select-none pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
