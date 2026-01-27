import { cn } from "@/src/modules/shared/utils/cn";
import { HTMLAttributes } from "react";

type GradientOverlayCardProps = HTMLAttributes<HTMLDivElement>;

export default function GradientOverlayCard({
  children,
  className,
  ...props
}: GradientOverlayCardProps) {
  return (
    <div
      className={`${cn("relative z-10 bg-card/40 rounded-[40px] border border-border/50 p-8 md:p-12 overflow-hidden shadow-sm group hover:border-primary/30 focus-within:border-primary/30", className)}`}
      {...props}
    >
      <div className="absolute inset-0 bg-linear-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none" />

      {children}
    </div>
  );
}
