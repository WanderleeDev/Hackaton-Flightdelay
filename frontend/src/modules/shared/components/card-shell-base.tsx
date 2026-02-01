import { HTMLAttributes } from "react";
import { cn } from "@/src/utils/cn";

type CardShellBaseProps = HTMLAttributes<HTMLDivElement>;

export default function CardShellBase(props: CardShellBaseProps) {
  return (
    <div
      className={cn(
        "group h-56 bg-card/40 backdrop-blur-sm rounded-[32px] border border-border p-8 flex flex-col justify-between hover:border-primary/30 hover:bg-card/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-wait",
        props.className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
