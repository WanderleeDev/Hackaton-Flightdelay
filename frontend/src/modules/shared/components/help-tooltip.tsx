import { HelpCircle } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "@/src/utils/cn";

type HelpTooltipProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
};

export function HelpTooltip({ text, className, ...props }: HelpTooltipProps) {
  return (
    <div className={cn(`relative size-fit group`, className)} {...props}>
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground transition-colors block cursor-pointer"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      <p className="absolute top-0 right-0 text-xs min-w-48 bg-black text-white p-2 rounded-lg -translate-y-[120%] transition-discrete opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-[110%] group-focus-within:-translate-y-[110%] group-focus-within:opacity-100 pointer-events-none z-50">
        {text}
      </p>
    </div>
  );
}
