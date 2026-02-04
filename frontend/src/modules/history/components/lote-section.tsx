import PredictionCardWrapper from "@/src/modules/shared/components/prediction-card-wrapper";
import { ActionIcon } from "@/src/modules/shared/components/action-icon";
import { ExternalLink, Package } from "lucide-react";
import { HTMLAttributes, PropsWithChildren } from "react";
import SectionHeaderB from "@/src/modules/shared/components/section-header-b";

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
    <PredictionCardWrapper
      className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8"
      hoverShadow={false}
      {...props}
    >
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
          className="ml-auto size-10 rounded-xl"
          iconClassName="size-5"
        />
      </SectionHeaderB>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {children}
      </div>
    </PredictionCardWrapper>
  );
}
