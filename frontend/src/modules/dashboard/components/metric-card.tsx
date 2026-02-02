import { HelpTooltip } from "@/src/modules/shared/components/help-tooltip";
import { LucideIcon } from "lucide-react";
import { cn } from "@/src/utils/cn";
import PredictionCardWrapper from "@/src/modules/shared/components/prediction-card-wrapper";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconClassName?: string;
  helpText?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName,
  helpText,
}: MetricCardProps) {
  return (
    <PredictionCardWrapper className="flex flex-col">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg bg-primary/10", iconClassName)}>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              {title}
            </h3>
          </div>
          {helpText && <HelpTooltip text={helpText} />}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1 uppercase font-semibold opacity-70">
            {subtitle}
          </p>
        )}
      </div>
    </PredictionCardWrapper>
  );
}
