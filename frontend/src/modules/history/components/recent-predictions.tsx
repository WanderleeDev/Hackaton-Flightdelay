import SectionHeader from "@/src/modules/shared/components/section-header";
import { History } from "lucide-react";
import { cn } from "@/src/utils/cn";
import ListHistory from "./list-history";
import ListHistorySkeleton from "../skeletons/list-history-skeleton";
import ErrorSuspenseBoundary from "@/src/modules/shared/components/error-suspense-boundary";

interface Props {
  className?: string;
}

export default function RecentPredictions({ className }: Props) {
  return (
    <aside
      className={cn(
        "h-[600px] lg:h-[600px] flex flex-col gap-4 overflow-y-auto",
        className,
      )}
    >
      <SectionHeader
        title="Recent"
        accentText="Predictions"
        label="Your recent predictions"
        size="sm"
        icon={<History className="size-5 text-primary" />}
      />
      <ErrorSuspenseBoundary fallback={<ListHistorySkeleton />}>
        <ListHistory />
      </ErrorSuspenseBoundary>
    </aside>
  );
}
