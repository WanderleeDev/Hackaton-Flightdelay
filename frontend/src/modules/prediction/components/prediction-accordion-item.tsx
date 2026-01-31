import { LucideIcon, ChevronDown } from "lucide-react";

interface PredictionAccordionItemProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function PredictionAccordionItem({
  title,
  subtitle,
  icon: Icon,
  children,
  defaultOpen = false,
}: PredictionAccordionItemProps) {
  return (
    <details
      name="command"
      className="group border border-border/50 rounded-[32px] overflow-hidden bg-card/20 backdrop-blur-sm"
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between gap-2 p-4 md:p-6 cursor-pointer list-none hover:bg-secondary/20 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Icon className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              {title}
            </span>
            <span className="text-sm font-bold tracking-tight">{subtitle}</span>
          </div>
        </div>
        <ChevronDown className="size-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
      </summary>
      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
        {children}
      </div>
    </details>
  );
}
