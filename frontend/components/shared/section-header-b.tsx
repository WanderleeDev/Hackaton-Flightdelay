import { cn } from "@/src/modules/shared/utils/cn";
import { formatDate } from "date-fns";
import { Calendar, Layers, LucideIcon, Package } from "lucide-react";
import { PropsWithChildren } from "react";

interface SectionHeaderBProps extends PropsWithChildren {
  title: string;
  serialNumber: number;
  date: string;
  simulationsCount: number;
  icon?: LucideIcon;
  className?: string;
}

export default function SectionHeaderB({
  title,
  serialNumber,
  date,
  simulationsCount,
  icon: Icon = Package,
  className,
  children,
}: SectionHeaderBProps) {
  return (
    <div className={cn("flex flex-col gap-4 mb-10 relative z-10", className)}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Icon className="size-5 text-primary" />
          </div>
        </div>
        <h3 className="flex items-baseline gap-4 md:gap-6 text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          <span className="capitalize">{title}</span>
          <span className="text-muted-foreground/50 text-xl md:text-2xl font-mono">
            #{serialNumber.toString().padStart(4, "0")}
          </span>
        </h3>
        {children}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-muted-foreground/80">
        <div className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors">
            <Calendar className="size-4 text-primary" />
          </div>
          <span className="text-sm font-semibold tracking-wide lowercase">
            {formatDate(date, "dd MMM yyyy HH:mm")}
          </span>
        </div>
        <div className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors">
            <Layers className="size-4 text-primary" />
          </div>
          <span className="text-sm font-semibold tracking-wide lowercase">
            {simulationsCount} Simulations
          </span>
        </div>
      </div>
    </div>
  );
}
