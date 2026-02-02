"use client";

import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/src/utils/cn";
import { AlertCircle, CheckCircle2, Info, Loader2, X } from "lucide-react";

interface CustomToastProps {
  t: string | number;
  title: string;
  description?: string;
  type?: "success" | "error" | "info" | "loading";
}

export function CustomToast({
  t,
  title,
  description,
  type = "info",
}: CustomToastProps) {
  const icons = {
    success: <CheckCircle2 className="size-5 text-primary" />,
    error: <AlertCircle className="size-5 text-destructive" />,
    info: <Info className="size-5 text-blue-400" />,
    loading: <Loader2 className="size-5 text-primary animate-spin" />,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg border bg-card/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[320px] transition-all duration-500 ease-out animate-in slide-in-from-top-2",
        type === "error"
          ? "border-destructive/30 shadow-destructive/5"
          : "border-white/10 shadow-primary/5",
      )}
    >
      <div className="relative size-16 shrink-0 rounded-md overflow-hidden border border-white/5 bg-transparent flex items-center justify-center">
        <Image
          src="/logo.webp"
          alt="App Logo"
          fill
          className="object-contain p-1"
        />
      </div>

      <div className="flex-1 flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "p-0.5 rounded-full",
              type === "success" && "bg-primary/5",
              type === "error" && "bg-destructive/5",
              type === "info" && "bg-blue-500/5",
              type === "loading" && "bg-primary/5",
            )}
          >
            {icons[type]}
          </div>
          <h4 className="text-[13px] font-bold text-foreground tracking-tight">
            {title}
          </h4>
        </div>
        {description && (
          <p className="text-[11px] text-muted-foreground/80 leading-snug ml-7">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => toast.dismiss(t)}
        className="p-1.5 rounded-md hover:bg-white/5 text-muted-foreground/40 hover:text-foreground transition-colors shrink-0 cursor-pointer"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export const showCustomToast = (
  title: string,
  options?: {
    description?: string;
    type?: "success" | "error" | "info" | "loading";
    duration?: number;
  },
) => {
  return toast.custom(
    (t) => (
      <CustomToast
        t={t}
        title={title}
        description={options?.description}
        type={options?.type}
      />
    ),
    {
      duration: options?.duration || 4000,
    },
  );
};
