import { ActionIcon } from "@/src/modules/shared/components/action-icon";
import GradientOverlayCard from "@/src/modules/shared/components/gradient-overlay-card";
import SectionHeaderB from "@/src/modules/shared/components/section-header-b";
import { ExternalLink, Package } from "lucide-react";
import { HTMLAttributes, PropsWithChildren } from "react";

type LoteSectionProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
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
  id,
  ...props
}: PropsWithChildren<LoteSectionProps>) {
  return (
    <GradientOverlayCard {...props}>
      <SectionHeaderB
        title={title}
        date={date}
        simulationsCount={simulationsCount}
        serialNumber={serialNumber}
        icon={Package}
      >
        <ActionIcon
          href={`/history/byLote/${id}`}
          target="_self"
          icon={ExternalLink}
          iconClassName="size-4"
          className="ml-auto bg-primary text-primary-foreground hover:text-primary"
        />
      </SectionHeaderB>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {children}
      </div>
    </GradientOverlayCard>
  );
}
