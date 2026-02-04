import { cn } from "@/src/utils/cn";
import { HTMLAttributes } from "react";

type GradientOverlayCardProps = HTMLAttributes<HTMLDivElement>;

export default function GradientOverlayCard({
  children,
  className,
  ...props
}: GradientOverlayCardProps) {
  return (
    <div
      className={`${cn("relative overflow-clip z-10 bg-card/40 rounded-2xl sm:rounded-3xl md:rounded-[40px] border p-4 sm:p-8 md:p-12 shadow-sm group border-primary/30", className)}`}
      {...props}
    >
      <div className="absolute inset-0 bg-linear-to-b from-primary/20 to-transparent rounded-[32px] pointer-events-none" />

      {children}
    </div>
  );
}
