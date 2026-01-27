import { ActionIcon } from "@/components/shared/action-icon";
import GradientOverlayCard from "@/components/shared/gradient-overlay-card";
import { Calendar, ExternalLink, Layers } from "lucide-react";
import { HTMLAttributes, PropsWithChildren } from "react";

type LoteSectionProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  date: string;
  simulationsCount: number;
  serialNumber: number;
};

export default function LoteSection({
  title,
  date,
  simulationsCount,
  serialNumber,
  children,
  ...props
}: PropsWithChildren<LoteSectionProps>) {
  return (
    <GradientOverlayCard {...props}>
      <div className="flex flex-col gap-4 mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 bg-primary rounded-full animate-pulse shadow-[0_0_15px_var(--primary)]" />
          <h3 className="flex gap-6 text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            <span className="capitalize">{title}</span>
            <span>#{serialNumber.toString().padStart(4, "0")}</span>
          </h3>
          <ActionIcon
            href={`/history/byLote/${serialNumber}`}
            target="_self"
            icon={ExternalLink}
            iconClassName="size-4"
            className="ml-auto bg-primary text-primary-foreground hover:text-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-muted-foreground/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-secondary/50">
              <Calendar className="size-4 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-wide lowercase">
              {date}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-secondary/50">
              <Layers className="size-4 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-wide lowercase">
              {simulationsCount} Simulations
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {children}
      </div>
    </GradientOverlayCard>
  );
}
